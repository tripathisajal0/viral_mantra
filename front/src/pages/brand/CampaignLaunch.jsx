import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import {
  CheckCircle2,
  ArrowRight,
  Video,
  Play,
  Zap,
  Info,
  Layout,
  Target,
  Wallet,
  CloudUpload,
  ChevronRight,
  Save as SaveIcon,
  Megaphone,
  Link as LinkIcon,
  Image as ImageIcon,
  FileText,
  Upload,
  X,
  FileCheck,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { db, storage } from '../../firebase';
import { doc, setDoc, updateDoc, increment, addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CampaignLaunch = () => {
  const [step, setStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['Instagram Reels']);
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Lifestyle');
  const [customCategory, setCustomCategory] = useState('');
  const [minFollowers, setMinFollowers] = useState('1000');
  const [ageGroup, setAgeGroup] = useState('18-24');
  const [locationType, setLocationType] = useState('Worldwide');
  const [customLocation, setCustomLocation] = useState('');
  
  // Budget States
  const [totalBudget, setTotalBudget] = useState('0');
  const [cpm, setCpm] = useState('0');
  const [maxPayout, setMaxPayout] = useState('0');
  const [startDate, setStartDate] = useState('');
  
  // Asset States
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoSuccess, setLogoSuccess] = useState(false);

  const [guidelinesUrl, setGuidelinesUrl] = useState('');
  const [guidelinesName, setGuidelinesName] = useState('');
  const [uploadingGuidelines, setUploadingGuidelines] = useState(false);
  const [guidelinesSuccess, setGuidelinesSuccess] = useState(false);

  const [referenceVideo, setReferenceVideo] = useState('');
  
  const [saving, setSaving] = useState(false);

  const togglePlatform = (name) => {
    setSelectedPlatforms(prev => 
      prev.includes(name) 
        ? prev.filter(p => p !== name) 
        : [...prev, name]
    );
  };

  const platforms = [
    { name: 'Instagram Reels', icon: Video },
    { name: 'YT Shorts', icon: Zap },
  ];

  // Optimization: Small files (like a 130KB logo) are processed as Base64 
  // to ensure instant performance regardless of network speed or Firebase Storage configuration.
  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingLogo(true);
      setLogoSuccess(false);
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        setLogoPreview(base64String);
        
        // For a hackathon, storing a 130KB image as Base64 in Firestore is extremely fast
        // and bypasses all Firebase Storage bucket/rule delays.
        setLogoUrl(base64String);
        setLogoSuccess(true);
        setUploadingLogo(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGuidelinesChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setGuidelinesName(file.name);
      setUploadingGuidelines(true);
      setGuidelinesSuccess(false);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        // Check if PDF is small enough for Base64 (max 500KB for safety)
        if (file.size < 500 * 1024) {
          setGuidelinesUrl(base64String);
          setGuidelinesSuccess(true);
          setUploadingGuidelines(false);
        } else {
          // If larger, try standard upload
          try {
            const guideRef = ref(storage, `guidelines/${Date.now()}_${file.name}`);
            const uploadResult = await uploadBytes(guideRef, file);
            const url = await getDownloadURL(uploadResult.ref);
            setGuidelinesUrl(url);
            setGuidelinesSuccess(true);
          } catch (error) {
            console.error("Guidelines upload error:", error);
            alert("Storage upload failed. Please try a smaller PDF file.");
          } finally {
            setUploadingGuidelines(false);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLaunch = async (e) => {
    if (e) e.preventDefault();
    if (!title) return alert("Please enter a campaign title");
    if (!logoUrl) return alert("Please upload your brand logo");
    if (!guidelinesUrl) return alert("Please upload campaign guidelines");
    
    setSaving(true);
    try {
      const finalCategory = category === 'Others' ? customCategory : category;
      const finalLocation = locationType === 'Country Specific' ? customLocation : locationType;
      const budgetNum = parseFloat(totalBudget) || 0;
      const cpmNum = parseFloat(cpm) || 0;
      const estimatedViews = cpmNum > 0 ? (budgetNum / cpmNum) * 1000 : 0;

      const campaignRef = doc(db, "brand", title);
      const userRef = doc(db, "users", user.uid);

      // Check balance
      if (budgetNum > (profile?.walletBalance || 0)) {
        setSaving(false);
        return alert(`Insufficient VM Points! You need ${budgetNum} pts, but you only have ${profile?.walletBalance || 0} pts.`);
      }

      await setDoc(campaignRef, {
        title,
        description,
        platforms: selectedPlatforms,
        category: finalCategory,
        minFollowers: parseInt(minFollowers) || 0,
        ageGroup,
        location: finalLocation,
        budget: budgetNum,
        cpm: cpmNum,
        maxPayout: parseFloat(maxPayout) || 0,
        targetViews: Math.round(estimatedViews),
        currentViews: 0,
        spend: 0,
        progress: 0,
        startDate,
        assets: {
          brandLogo: logoUrl, 
          referenceVideo,
          guidelines: guidelinesUrl, 
          guidelinesName: guidelinesName
        },
        status: 'active',
        brandId: user?.uid || 'unknown',
        requests: [], // Array to store creator application/request objects
        createdAt: new Date(),
        lastUpdated: new Date()
      });

      // Deduct from wallet
      await updateDoc(userRef, {
        walletBalance: increment(-budgetNum)
      });

      // Record Transaction
      await addDoc(collection(db, "transactions"), {
        userId: user.uid,
        type: 'Campaign Budget',
        detail: title,
        amount: -budgetNum,
        status: 'Debited',
        createdAt: new Date()
      });
      
      alert("Campaign launched successfully!");
      navigate('/brand');
    } catch (error) {
      console.error("Launch error details:", error);
      alert("Failed to launch campaign: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const steps = [
    { id: 1, name: 'Basics', icon: Layout },
    { id: 2, name: 'Targeting', icon: Target },
    { id: 3, name: 'Budget', icon: Wallet },
    { id: 4, name: 'Assets', icon: CloudUpload },
  ];

  const calcEstimatedViews = () => {
    const b = parseFloat(totalBudget) || 0;
    const c = parseFloat(cpm) || 0;
    if (c === 0) return 0;
    return Math.round((b / c) * 1000);
  };

  return (
    <div className="space-y-8">
      <div className="max-w-[1000px] mx-auto">
          {/* Stepper */}
          <div className="mb-12 flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surface-container-highest -translate-y-1/2 -z-10"></div>
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold ring-4 ring-white transition-all",
                  step >= s.id ? "bg-primary text-white" : "bg-surface-container-highest text-outline"
                )}>
                  {s.id}
                </div>
                <span className={cn(
                  "font-label-bold text-caption transition-colors",
                  step >= s.id ? "text-primary" : "text-outline"
                )}>
                  {s.name}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="glass-card rounded-3xl p-8 shadow-xl shadow-indigo-500/5"
                >
                  {step === 1 && (
                    <div className="space-y-8">
                      <header>
                        <h2 className="text-h2 text-on-surface mb-2 font-bold">Campaign Basics</h2>
                        <p className="text-body-md text-outline">Define the core identity of your creative campaign.</p>
                      </header>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="font-label-bold text-on-surface-variant block">Campaign Title</label>
                          <input
                            className="w-full bg-white border border-outline-variant rounded-xl p-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                            placeholder="e.g. Summer Glow Skincare Launch 2024"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-label-bold text-on-surface-variant block">Brief Description</label>
                          <textarea
                            className="w-full bg-white border border-outline-variant rounded-xl p-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                            placeholder="Tell creators about your brand and what you hope to achieve..."
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>

                        <div className="space-y-4">
                          <label className="font-label-bold text-on-surface-variant block">Platform Selection</label>
                          <div className="grid grid-cols-2 gap-4">
                            {platforms.map((p) => (
                              <button
                                key={p.name}
                                type="button"
                                onClick={() => togglePlatform(p.name)}
                                className={cn(
                                  "border-2 p-4 rounded-2xl flex flex-col items-center gap-2 transition-all",
                                  selectedPlatforms.includes(p.name)
                                    ? "border-primary bg-primary/5 text-primary"
                                    : "border-outline-variant hover:border-primary/50 text-outline hover:text-primary"
                                )}
                              >
                                <p.icon size={30} />
                                <span className="font-label-bold text-caption">{p.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-8">
                      <header>
                        <h2 className="text-h2 text-on-surface mb-2 font-bold">Campaign Targeting</h2>
                        <p className="text-body-md text-outline">Specify which creators you want to work with.</p>
                      </header>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="font-label-bold text-on-surface-variant block">Niche / Category</label>
                          {category === 'Others' ? (
                            <div className="relative group">
                              <input
                                autoFocus
                                className="w-full bg-white border border-primary rounded-xl p-4 pr-20 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                placeholder="Type your custom category..."
                                type="text"
                                value={customCategory}
                                onChange={(e) => setCustomCategory(e.target.value)}
                              />
                              <button 
                                type="button"
                                onClick={() => { setCategory('Lifestyle'); setCustomCategory(''); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary font-bold text-xs hover:underline"
                              >
                                Use List
                              </button>
                            </div>
                          ) : (
                            <select 
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              className="w-full bg-white border border-outline-variant rounded-xl p-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                            >
                              <option value="" disabled>Select a category</option>
                              <option>Lifestyle</option>
                              <option>Fashion</option>
                              <option>Gaming</option>
                              <option>Tech</option>
                              <option>Food</option>
                              <option>Fitness</option>
                              <option>Travel</option>
                              <option>Beauty</option>
                              <option>Others</option>
                            </select>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <label className="font-label-bold text-on-surface-variant block">Min. Followers</label>
                          <input
                            className="w-full bg-white border border-outline-variant rounded-xl p-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                            placeholder="e.g. 5000"
                            type="number"
                            value={minFollowers}
                            onChange={(e) => setMinFollowers(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="font-label-bold text-on-surface-variant block">Target Age Group</label>
                          <select 
                            value={ageGroup}
                            onChange={(e) => setAgeGroup(e.target.value)}
                            className="w-full bg-white border border-outline-variant rounded-xl p-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                          >
                            <option>13-17</option>
                            <option>18-24</option>
                            <option>25-34</option>
                            <option>35-44</option>
                            <option>45+</option>
                            <option>All Ages</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="font-label-bold text-on-surface-variant block">Location Target</label>
                          {locationType === 'Country Specific' ? (
                            <div className="relative group">
                              <input
                                autoFocus
                                className="w-full bg-white border border-primary rounded-xl p-4 pr-20 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                placeholder="Type country name..."
                                type="text"
                                value={customLocation}
                                onChange={(e) => setCustomLocation(e.target.value)}
                              />
                              <button 
                                type="button"
                                onClick={() => { setLocationType('Worldwide'); setCustomLocation(''); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary font-bold text-xs hover:underline"
                              >
                                Use List
                              </button>
                            </div>
                          ) : (
                            <select 
                              value={locationType}
                              onChange={(e) => setLocationType(e.target.value)}
                              className="w-full bg-white border border-outline-variant rounded-xl p-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                            >
                              <option>Worldwide</option>
                              <option>Asia</option>
                              <option>Europe</option>
                              <option>Country Specific</option>
                            </select>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-8">
                      <header>
                        <h2 className="text-h2 text-on-surface mb-2 font-bold">Budget & Timeline</h2>
                        <p className="text-body-md text-outline">Set your investment and campaign schedule.</p>
                      </header>

                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="font-label-bold text-on-surface-variant block">Total Budget (INR)</label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline font-bold">₹</span>
                              <input
                                className="w-full bg-white border border-outline-variant rounded-xl p-4 pl-10 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                type="number"
                                value={totalBudget}
                                onChange={(e) => setTotalBudget(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="font-label-bold text-on-surface-variant block">Target CPM (INR)</label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline font-bold">₹</span>
                              <input
                                className="w-full bg-white border border-outline-variant rounded-xl p-4 pl-10 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                type="number"
                                value={cpm}
                                onChange={(e) => setCpm(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="font-label-bold text-on-surface-variant block">Max Payout per Creator (INR)</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline font-bold">₹</span>
                            <input
                              className="w-full bg-white border border-outline-variant rounded-xl p-4 pl-10 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                              placeholder="e.g. 5000"
                              type="number"
                              value={maxPayout}
                              onChange={(e) => setMaxPayout(e.target.value)}
                            />
                            <p className="text-[11px] text-outline italic mt-1 px-1">
                              Individual creators cannot earn more than this amount regardless of views.
                            </p>
                          </div>
                        </div>

                        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex items-center justify-between">
                          <div>
                            <p className="text-sm text-primary font-bold uppercase tracking-wider">Estimated Total Views</p>
                            <h3 className="text-3xl font-bold text-primary mt-1">
                              {new Intl.NumberFormat('en-IN').format(calcEstimatedViews())}
                            </h3>
                          </div>
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30">
                            <Zap size={24} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="font-label-bold text-on-surface-variant block">Start Date</label>
                          <input
                            className="w-full bg-white border border-outline-variant rounded-xl p-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                          <p className="text-[11px] text-outline italic mt-1">
                            Note: This campaign will automatically conclude once the target view count is achieved.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-8">
                      <header>
                        <h2 className="text-h2 text-on-surface mb-2 font-bold">Campaign Assets</h2>
                        <p className="text-body-md text-outline">Upload your brand identity and guidelines.</p>
                      </header>

                      <div className="space-y-6">
                        {/* Logo Upload */}
                        <div className="space-y-2">
                          <label className="font-label-bold text-on-surface-variant block flex items-center gap-2">
                            <ImageIcon size={18} className="text-primary" />
                            Brand Logo <span className="text-error">*</span>
                          </label>
                          
                          <div className="flex flex-col gap-4">
                            <div className={cn(
                              "w-full h-48 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all relative group",
                              logoPreview ? "border-primary bg-primary/5" : "border-outline-variant bg-surface-container-low hover:bg-surface-container transition-colors"
                            )}>
                              {logoPreview ? (
                                <>
                                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain p-4" />
                                  {!uploadingLogo && (
                                    <button 
                                      onClick={() => { setLogoUrl(''); setLogoPreview(null); setLogoSuccess(false); }}
                                      className="absolute top-4 right-4 bg-error text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X size={20} />
                                    </button>
                                  )}
                                  
                                  {uploadingLogo && (
                                    <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center">
                                      <Loader2 size={32} className="text-primary animate-spin mb-2" />
                                      <span className="text-caption font-bold text-primary">Processing Logo...</span>
                                    </div>
                                  )}

                                  {logoSuccess && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-2 shadow-lg">
                                      <CheckCircle2 size={14} />
                                      Uploaded Successfully
                                    </div>
                                  )}
                                </>
                              ) : (
                                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                  <Upload size={40} className="text-outline/50 mb-3" />
                                  <span className="text-body-md font-bold text-outline">Click to upload brand logo</span>
                                  <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
                                </label>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Guidelines Upload */}
                        <div className="space-y-2">
                          <label className="font-label-bold text-on-surface-variant block flex items-center gap-2">
                            <FileText size={18} className="text-primary" />
                            Campaign Guidelines (PDF) <span className="text-error">*</span>
                          </label>
                          
                          <div className={cn(
                            "w-full rounded-2xl border-2 border-dashed p-8 transition-all relative group",
                            guidelinesSuccess || uploadingGuidelines ? "border-primary bg-primary/5" : "border-outline-variant bg-surface-container-low hover:bg-surface-container"
                          )}>
                            {uploadingGuidelines ? (
                               <div className="flex flex-col items-center justify-center">
                                 <Loader2 size={32} className="text-primary animate-spin mb-2" />
                                 <span className="text-caption font-bold text-primary">Processing PDF...</span>
                               </div>
                            ) : guidelinesSuccess ? (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <FileCheck size={24} />
                                  </div>
                                  <div>
                                    <p className="font-bold text-on-surface text-sm truncate max-w-[200px]">{guidelinesName}</p>
                                    <span className="text-green-500 text-[12px] font-bold flex items-center gap-1">
                                      <CheckCircle2 size={12} />
                                      Uploaded Successfully
                                    </span>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => { setGuidelinesUrl(''); setGuidelinesName(''); setGuidelinesSuccess(false); }}
                                  className="text-outline hover:text-error transition-colors"
                                >
                                  <X size={20} />
                                </button>
                              </div>
                            ) : (
                              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                <CloudUpload size={40} className="text-outline/50 mb-3" />
                                <span className="text-body-md font-bold text-outline">Upload Guidelines PDF</span>
                                <span className="text-[10px] text-outline mt-1 italic">Creators will use this to follow your brief</span>
                                <input type="file" className="hidden" accept=".pdf" onChange={handleGuidelinesChange} />
                              </label>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="font-label-bold text-on-surface-variant block flex items-center gap-2">
                            <Video size={18} className="text-primary" />
                            Reference Video Link (Optional)
                          </label>
                          <input
                            className="w-full bg-white border border-outline-variant rounded-xl p-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                            placeholder="Instagram Reel or YouTube reference link"
                            type="text"
                            value={referenceVideo}
                            onChange={(e) => setReferenceVideo(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-8 flex items-center justify-between border-t border-outline-variant/30 mt-8">
                    <div className="flex gap-4">
                      {step > 1 && (
                        <button 
                          type="button"
                          onClick={() => setStep(step - 1)}
                          className="px-6 py-3 font-label-bold text-outline hover:text-on-surface transition-colors"
                        >
                          Prev
                        </button>
                      )}
                      {step === 4 && (
                        <button 
                          type="button"
                          onClick={handleLaunch}
                          disabled={saving || uploadingLogo || uploadingGuidelines}
                          className="px-12 py-3 bg-indigo-600 text-white rounded-full font-label-bold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" 
                        >
                          <Megaphone size={18} />
                          {saving ? "Launching..." : (uploadingLogo || uploadingGuidelines) ? "Processing Assets..." : "Launch"}
                        </button>
                      )}
                    </div>
                    
                    {step < 4 && (
                      <button
                        type="button"
                        onClick={() => setStep(step + 1)}
                        className="bg-primary text-white px-10 py-3 rounded-full font-label-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                      >
                        Next
                        <ArrowRight size={18} />
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="col-span-4 space-y-6">
              <div className="glass-card rounded-3xl p-6 border-indigo-100 bg-gradient-to-br from-white to-surface-container-low">
                <div className="w-12 h-12 bg-tertiary-fixed rounded-2xl flex items-center justify-center mb-4 text-tertiary">
                  <Info size={24} />
                </div>
                <h3 className="text-h3 font-bold text-on-surface mb-2">Pro Tip</h3>
                <p className="text-caption text-on-surface-variant leading-relaxed">
                  Campaigns with specific platform choices receive 40% more creator applications. Creators prefer knowing exactly which format they are filming for.
                </p>
              </div>

              <div className="glass-card rounded-3xl p-6">
                <h3 className="font-label-bold text-on-surface mb-4">Estimated Reach</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-caption text-outline">Potential Reach</span>
                    <span className="font-label-bold text-primary">
                      {new Intl.NumberFormat('en-IN').format(calcEstimatedViews())}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: parseFloat(totalBudget) > 0 ? '70%' : '0%' }}
                      className="h-full bg-primary"
                    ></motion.div>
                  </div>
                  <p className="text-caption text-outline italic">
                    {parseFloat(totalBudget) > 0 ? "Great budget for high engagement!" : "Complete targeting & budget to see estimates."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CampaignLaunch;
