import React, {useEffect, useMemo, useRef, useState} from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, LockKeyhole, Play, Calendar, ShieldAlert, Video, LogIn } from 'lucide-react';
import './styles.css';
import students from './data/students.json';

const RICKROLL_THRESHOLD = 90;
const rickrollMedia = '/media/rickroll.mp4';

const FAKE_GRADES = [5.00, 3.00, 2.75, 2.50];

function fakeGradeLabel(g) {
  if (g === 5.00) return 'FAILED';
  if (g === 3.00) return 'CONDITIONAL / FOR REMOVAL';
  return 'PASSED (BARELY)';
}

function fakeGradeCategory(g) {
  if (g === 5.00) return 'fail';
  if (g === 3.00) return 'warning';
  return 'lowpass';
}

const revealMedia = {
  honors:    '/media/post-reveal/laica.mp4',
  excellent: '/media/post-reveal/sumakses.mp4',
  pass:      '/media/post-reveal/luha.mp4',
  warning:   '/media/post-reveal/tyl.mp4',
  fail:      '/media/post-reveal/tumawaka.mp4'
};

const MAX_VIEWS = 3;
const VIEWS_KEY = (sid) => `ite212_views_${sid}`;

function getViews(sid) {
  try { return Number(localStorage.getItem(VIEWS_KEY(sid))) || 0; }
  catch { return 0; }
}
function setViews(sid, n) {
  try { localStorage.setItem(VIEWS_KEY(sid), String(n)); } catch {}
}

function getCategory(s) {
  if (!s) return 'neutral';
  const g = s.numerical_equivalent;
  if (g == 1.00 || g == 1.25 || g == 1.50 || g == 1.75 || g == 2.00) return 'honors';
  if (g == 2.25 || g == 2.50) return 'pass';
  if (g == 2.75) return 'excellent';
  if (g == 3.00) return 'warning';
  return 'fail';
}

function isRickrollTarget(s) {
  return Number(s?.midterm_grade) >= RICKROLL_THRESHOLD;
}

function shouldPrank(s) {
  if (!s) return false;
  return isRickrollTarget(s) || s.numerical_equivalent <= 1.75;
}

function MediaFallback({label, note, onContinue}) {
  return (
    <div className="mediaFallback">
      <Video size={38}/>
      <b>{label}</b>
      <small>{note}</small>
      {onContinue && <button onClick={onContinue}>CONTINUE →</button>}
    </div>
  );
}

function App(){
  const [id, setId] = useState('');
  const [student, setStudent] = useState(null);
  const [stage, setStage] = useState('lookup');
  const [fakeGrade, setFakeGrade] = useState(5.00);
  const [error, setError] = useState('');
  const [revealMediaMissing, setRevealMediaMissing] = useState(false);

  // 5-second delay before the CHECK THE RESULT button appears on fakeFail.
  const [showCheckBtn, setShowCheckBtn] = useState(false);

  const revealVideoRef = useRef(null);

  const found = useMemo(
    () => students.find(s => s.student_id.toLowerCase() === id.trim().toLowerCase()),
    [id]
  );
  const category = getCategory(student);
  const fakeLabel = fakeGradeLabel(fakeGrade);
  const fakeCat = fakeGradeCategory(fakeGrade);

  // 5-second panic timer on the fakeFail screen.
  useEffect(() => {
    if (stage !== 'fakeFail') return;
    setShowCheckBtn(false);
    const t = setTimeout(() => setShowCheckBtn(true), 5000);
    return () => clearTimeout(t);
  }, [stage, fakeGrade]);

  function lookup(e){
    e?.preventDefault();
    setError('');
    if (!found){
      setError('Student ID not found. Check the ID and try again.');
      return;
    }
    if (getViews(found.student_id) >= MAX_VIEWS){
      setError(`View limit reached. You've already viewed this grade ${MAX_VIEWS} times.`);
      return;
    }
    setStudent(found);
    setStage('ready');
  }

  function start(){
    if (shouldPrank(student)) {
      const rolled = FAKE_GRADES[Math.floor(Math.random() * FAKE_GRADES.length)];
      setFakeGrade(rolled);
      setStage('fakeFail');
      return;
    }
    goToReveal();
  }

  function startRickroll(){
    setStage('rickroll');
  }

  function afterRickroll(){
    setStage('prankReveal');
  }

  function goToReveal(){
    setRevealMediaMissing(false);
    setStage('reveal');
    if (student){
      setViews(student.student_id, getViews(student.student_id) + 1);
    }
  }

  return (
    <main className="app">
      <div className="glow g1"/>
      <div className="glow g2"/>

      <header>
        <div className="brand">
          <div className="logo">{`{ }`}</div>
          <div>
            <b>Grade Reveal</b>
            <span>College of Computer Studies</span>
          </div>
        </div>
        <div className="badge"><Calendar size={15}/> MIDTERM 2026</div>
      </header>

      <AnimatePresence mode="wait">

        {stage === 'lookup' && (
          <motion.section key="lookup" className="panel" initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-25}}>
            {/* <div className="eyebrow">GRADE REVEAL SYSTEM</div> */}
            <h1>Ready to face<br/><em>your fate?</em></h1>
            <p className="sub">Enter your Student ID to find out your grade this Midterms</p>
            <form onSubmit={lookup} className="lookup">
              <div className="inputWrap">
                <Search size={20}/>
                <input value={id} onChange={e=>setId(e.target.value)} placeholder="e.g. MMC2025-00001" autoFocus/>
              </div>
              <button><LogIn size={19}/>Login</button>
            </form>
            {error && (
              <motion.div className="error" initial={{opacity:0}} animate={{opacity:1}}>
                <ShieldAlert size={17}/>{error}
              </motion.div>
            )}
            <h4 className="privacy"><LockKeyhole size={14}/> Your grade is revealed only after verification. Max {MAX_VIEWS} views per student.</h4>
          </motion.section>
        )}

        {stage === 'ready' && (
          <motion.section key="ready" className="panel center" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} exit={{opacity:0}}>
            <div className="verified">STUDENT FOUND</div>
            <h2>{student.student_name}</h2>
            <h3>{student.section} – {student.year_level} – {student.program}</h3>
            <div className="redacted">
              <span>COURSE</span><b>{student.course}</b>
              <span>GRADE</span><b>?.??</b>
            </div>
            {shouldPrank(student) && <div className="prankHint">YOUR SCORE LOOKS SUSPICIOUSLY GOOD...</div>}
            <p className="warningText">Before the grade appears, your fate has been selected.</p>
            <button className="primary" onClick={start}>
              <Play size={19} fill="currentColor"/> REVEAL MY GRADE
            </button>
          </motion.section>
        )}

        {stage === 'fakeFail' && (
          <motion.section
            key="fakeFail"
            className={`panel fakeFail ${fakeCat}`}
            initial={{opacity:0,scale:.92}}
            animate={{opacity:1,scale:1}}
          >
            <div className="eyebrow">FINAL RESULT</div>
            <motion.div
              className="fakeGrade"
              animate={{scale:[1,1.05,1]}}
              transition={{duration:1.2,repeat:1}}
            >{fakeGrade.toFixed(2)}</motion.div>
            <h2>{fakeLabel}</h2>
            <p>Numerical Equivalent: <b>{fakeGrade.toFixed(2)}</b></p>
            <motion.div
              className="fakeStamp"
              initial={{opacity:0,rotate:-12,scale:.5}}
              animate={{opacity:1,rotate:-4,scale:1}}
              transition={{delay:.7,type:'spring'}}
            >RESULT VERIFIED</motion.div>
            <p className="prankSub">Wait... something doesn't look right.</p>

            {/* 5-second panic delay before the CHECK button appears */}
            {showCheckBtn ? (
              <button className="primary" onClick={startRickroll}>
                <Play size={18} fill="currentColor"/> CHECK THE RESULT
              </button>
            ) : (
              <p className="prankSub">verifying... do not close this window.</p>
            )}
          </motion.section>
        )}

        {stage === 'rickroll' && (
          <motion.section key="rickroll" className="panel memePanel" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <div className="eyebrow">SYSTEM ERROR DETECTED</div>
            <h2>WAIT... VERIFYING YOUR GRADE</h2>
            <div className="videoBox prankVideo">
              <video
                src={rickrollMedia}
                autoPlay
                playsInline
                controls
                onEnded={afterRickroll}
                onError={afterRickroll}
              />
            </div>
            <p className="hint">If autoplay is blocked, press play. The real grade remains hidden.</p>
          </motion.section>
        )}

        {stage === 'prankReveal' && (
          <motion.section key="prankReveal" className="panel prankReveal" initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}}>
            <motion.div className="rickText" initial={{y:20,opacity:0}} animate={{y:0,opacity:1}}>HAHAHA!</motion.div>
            <h1>YOU GOT<br/><em>RICKROLLED!</em></h1>
            <p>Okay, okay. The <b>{fakeGrade.toFixed(2)}</b> was fake.</p>
            <button className="primary" onClick={goToReveal}>SHOW MY ACTUAL GRADE →</button>
          </motion.section>
        )}

        {stage === 'reveal' && (
          <motion.section key="reveal" className={`panel result ${category}`} initial={{opacity:0}} animate={{opacity:1}}>
            {/* <motion.div className="confetti" initial={{opacity:0}} animate={{opacity:1}}>✦　✧　✦　✧　✦</motion.div> */}
            <div className="eyebrow">FINAL RESULT</div>
            <h3 className="studentName">{student.student_name}</h3>
            <motion.div
              className="grade"
              initial={{scale:.3,opacity:0}}
              animate={{scale:1,opacity:1}}
              transition={{type:'spring',stiffness:170,damping:12}}
            >{student.numerical_equivalent.toFixed(2)}</motion.div>
            <h2 className="raw">Midterm Grade: <b>{student.midterm_grade}</b></h2>
            <h2>
              {student.numerical_equivalent === 5
                ? "'WAG KA NANG MAGPALIWANAG!"
                : student.numerical_equivalent <= 1.75
                  ? 'SHENEEL! GALINGAN PA. AJA!'
                  : 'PWEDE NA!'}
            </h2>
            <p>
              {student.numerical_equivalent === 5
                ? 'Ang tamad kasi, sabi sa iyo may balik yan eh!'
                : 'SA IS NA IS ALL PASADO. Pa burger ka naman aba!'}
            </p>

            <motion.div
              className="videoBox revealVideo"
              initial={{opacity:0, y:30}}
              animate={{opacity:1, y:0}}
              transition={{delay:1.2, duration:.5}}
              onAnimationComplete={() => {
                revealVideoRef.current?.play().catch(() => {});
              }}
              style={{marginTop:'1.25rem'}}
            >
              {!revealMediaMissing ? (
                <video
                  ref={revealVideoRef}
                  src={revealMedia[category]}
                  playsInline
                  controls
                  onError={() => setRevealMediaMissing(true)}
                />
              ) : (
                <MediaFallback
                  label={student.numerical_equivalent === 5 ? 'F IN THE CHAT' : 'LET HIM COOK'}
                  note="Optional: add a reaction video to public/media/post-reveal/."
                />
              )}
            </motion.div>
          </motion.section>
        )}

      </AnimatePresence>

      
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App/>);