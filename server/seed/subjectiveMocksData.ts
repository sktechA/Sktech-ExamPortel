/**
 * SKTECH EXAM — Comprehensive Subjective & Branch-Wise Catalog
 * Supports Engineering Subjective Papers, General & Language Descriptive Papers,
 * and Exam-Specific Descriptive Options (Banking, SSC, State PSC, Police, Railways).
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import { SubjectiveMockPaper } from '../../src/types';

export const SUBJECTIVE_MOCKS_DATA: SubjectiveMockPaper[] = [
  // ==========================================
  // 1. ENGINEERING BRANCH SUBJECTIVE PAPERS
  // ==========================================
  {
    id: 'subj_ee_01',
    code: 'EE-SUBJ-01',
    titleEn: 'Electrical Engineering Subjective Paper',
    titleHi: 'विद्युत अभियांत्रिकी विवरणात्मक प्रश्नपत्र',
    branchCategory: 'ENGINEERING',
    branchNameEn: 'Electrical Engineering',
    branchNameHi: 'विद्युत अभियांत्रिकी (EE)',
    subTopics: ['Electric Circuits', 'Electrical Machines', 'Power Systems', 'Control Systems'],
    subTopicsHi: ['विद्युत परिपथ', 'विद्युत मशीनें', 'विद्युत प्रणाली (पावर सिस्टम)', 'नियंत्रण प्रणाली'],
    examTarget: 'ESE / GATE / SSC JE / State AE-JE',
    durationMinutes: 180,
    totalMarks: 200,
    questionsCount: 5,
    isFree: true,
    attemptsCount: 3420,
    instructionsEn: [
      'Write detailed technical solutions showing circuit diagrams, state equations, and step-by-step mathematical deductions.',
      'Highlight final numerical values along with proper SI units (V, A, kVA, rad/sec).',
      'Word limits and marks are indicated next to each sub-question.',
    ],
    instructionsHi: [
      'परिपथ आरेख, स्थिति समीकरण एवं चरणबद्ध गणितीय निष्कर्षों के साथ विस्तृत समाधान लिखें।',
      'उचित एसआई इकाइयों (V, A, kVA, rad/sec) के साथ अंतिम सांख्यिकीय मानों को रेखांकित करें।',
      'प्रत्येक प्रश्न के सामने शब्द सीमा और अंक अंकित हैं।',
    ],
    questions: [
      {
        id: 'q_ee_1',
        questionNumber: 1,
        titleEn:
          'Derive the torque-slip characteristics of a 3-phase squirrel cage induction motor from standstill to synchronous speed. Explain the condition for maximum starting torque and the effect of adding external rotor resistance in a wound-rotor motor.',
        titleHi:
          '3-फेज स्क्विरल केज प्रेरण मोटर के लिए स्थिर अवस्था से तुल्यकालिक गति तक टॉर्क-स्लिप विशेषताओं का निगमन कीजिए। अधिकतम प्रारंभिक बलाघूर्ण (Starting Torque) की शर्त तथा वाउंड रोटर में बाह्य रोटर प्रतिरोध जोड़ने के प्रभाव को स्पष्ट कीजिए।',
        marks: 20,
        wordLimit: 400,
        topicsCovered: ['Electrical Machines', 'Induction Motor Torque Equation'],
        difficulty: 'MODERATE',
        modelAnswerEn:
          '1. Equivalent Circuit & Torque Derivation: The electromagnetic torque developed is given by T = (3 / ws) * [(V^2 * R2\' / s) / ((R1 + R2\' / s)^2 + (X1 + X2\')^2)]. \n2. Standstill (s = 1) vs Low Slip Region: At low slip near synchronous speed, (s*X2\') is negligible, so torque is directly proportional to slip (linear zone). At high slip, (s*X2\') dominates, making torque inversely proportional to slip (unstable braking zone).\n3. Condition for Maximum Torque: Differentiating T with respect to slip s yields s_max = R2\' / sqrt(R1^2 + (X1 + X2\')^2) ≈ R2\' / X2\'. The maximum torque magnitude itself is independent of rotor resistance.\n4. External Resistance Insertion: In slip-ring (wound) induction motors, adding external rotor resistance shifts the maximum torque peak toward standstill (s = 1), significantly multiplying the starting torque while decreasing the starting inrush current.',
        modelAnswerHi:
          '1. तुल्यकालिक समतुल्य परिपथ एवं टॉर्क निगमन: विकसित विद्युत-चुंबकीय बलाघूर्ण T = (3 / ws) * [(V^2 * R2\' / s) / ((R1 + R2\' / s)^2 + (X1 + X2\')^2)] होता है।\n2. कम स्लिप बनाम उच्च स्लिप क्षेत्र: तुल्यकालिक गति के समीप निम्न स्लिप पर (s*X2\') नगण्य होता है, जिससे टॉर्क स्लिप के समानुपाती (रैखिक) रहता है। उच्च स्लिप पर टॉर्क स्लिप के व्युत्क्रमानुपाती हो जाता है।\n3. अधिकतम टॉर्क की शर्त: s_max = R2\' / X2\' पर अधिकतम टॉर्क प्राप्त होता है। उल्लेखनीय है कि अधिकतम टॉर्क का परिमाण रोटर प्रतिरोध पर निर्भर नहीं करता।\n4. बाह्य रोटर प्रतिरोध का प्रभाव: स्लिप-रिंग मोटर में बाह्य प्रतिरोध जोड़ने पर अधिकतम टॉर्क स्थिर अवस्था (s=1) की ओर स्थानांतरित हो जाता है, जिससे प्रारंभिक टॉर्क बढ़ता है तथा प्रारंभिक धारा कम होती है।',
        evaluationRubric: [
          { criterionEn: 'Torque equation derivation & circuit parameters', criterionHi: 'टॉर्क समीकरण निगमन एवं परिपथ प्राचल', maxMarks: 8 },
          { criterionEn: 'Torque-slip graphical curve explanation', criterionHi: 'टॉर्क-स्लिप वक्र एवं विभिन्न क्षेत्रों की व्याख्या', maxMarks: 6 },
          { criterionEn: 'Maximum torque conditions and rotor resistance effect', criterionHi: 'अधिकतम टॉर्क की शर्त व रोटर प्रतिरोध प्रभाव', maxMarks: 6 },
        ],
        keyPointsEn: [
          'Torque formula with slip parameter',
          'Maximum torque slip condition s_max = R2/X2',
          'T_max magnitude independent of rotor resistance',
          'External resistance increases starting torque and reduces starting current',
        ],
        keyPointsHi: [
          'स्लिप प्राचल के साथ बलाघूर्ण सूत्र',
          'अधिकतम बलाघूर्ण की स्लिप शर्त s_max = R2/X2',
          'T_max का परिमाण रोटर प्रतिरोध से स्वतंत्र होना',
          'बाह्य प्रतिरोध से प्रारंभिक टॉर्क में वृद्धि तथा धारा में कमी',
        ],
      },
      {
        id: 'q_ee_2',
        questionNumber: 2,
        titleEn:
          'Explain the Equal Area Criterion for transient stability analysis of a Single Machine Infinite Bus (SMIB) power system during a 3-phase symmetrical fault on one of the parallel transmission lines.',
        titleHi:
          'समानांतर ट्रांसमिशन लाइनों में से एक पर 3-फेज सममितीय दोष के दौरान एकल मशीन अनंत बस (SMIB) विद्युत प्रणाली के क्षणिक स्थायित्व विश्लेषण हेतु सम-क्षेत्र मानदंड (Equal Area Criterion) की व्याख्या कीजिए।',
        marks: 20,
        wordLimit: 350,
        topicsCovered: ['Power Systems', 'Transient Stability', 'Equal Area Criterion'],
        difficulty: 'HARD',
        modelAnswerEn:
          '1. Swing Equation: M * (d^2(delta)/dt^2) = P_m - P_e. When electrical power P_e drops during a 3-phase fault, the mechanical input P_m exceeds P_e, causing the rotor to accelerate (kinetic energy storage).\n2. Accelerating Area A1: Area under the curve from initial rotor angle delta_0 to fault clearance angle delta_c: A1 = Integral(P_m - P_ef) d(delta).\n3. Decelerating Area A2: Once the faulted line is isolated, power transfer capability increases to P_epost. When P_epost > P_m, the rotor decelerates until stored kinetic energy is returned to the system: A2 = Integral(P_epost - P_m) d(delta).\n4. Stability Criterion: For system stability, decelerating area A2 must be greater than or equal to accelerating area A1 before delta reaches critical angle delta_max. This criterion establishes the Critical Clearing Time (CCT).',
        modelAnswerHi:
          '1. स्विंग समीकरण: M * (d^2(delta)/dt^2) = P_m - P_e. जब 3-फेज दोष के दौरान विद्युत शक्ति P_e शून्य अथवा अत्यंत कम हो जाती है, तब यांत्रिक इनपुट P_m अधिक होने से रोटर त्वरित होता है।\n2. त्वरण क्षेत्र A1: प्रारंभिक कोण delta_0 से दोष निवारण कोण delta_c तक: A1 = Integral(P_m - P_ef) d(delta).\n3. मंदन क्षेत्र A2: दोषपूर्ण लाइन के वियोजन पश्चात P_epost > P_m होता है, जिससे रोटर मंदित होता है: A2 = Integral(P_epost - P_m) d(delta).\n4. स्थायित्व शर्त: प्रणाली के स्थिर रहने के लिए मंदन क्षेत्र A2 का मान त्वरण क्षेत्र A1 के बराबर या अधिक होना अनिवार्य है। यह क्रांतिक शोधन समय (Critical Clearing Time) निर्धारित करता है।',
        evaluationRubric: [
          { criterionEn: 'Swing equation formulation & kinetic balance', criterionHi: 'स्विंग समीकरण एवं गतिज ऊर्जा संतुलन', maxMarks: 6 },
          { criterionEn: 'Power-angle curve representation (Prefault, Fault, Postfault)', criterionHi: 'शक्ति-कोण वक्र निरूपण (दोष-पूर्व, दोष-दौरान, दोष-पश्चात)', maxMarks: 8 },
          { criterionEn: 'Equal area condition & critical clearing angle derivation', criterionHi: 'सम-क्षेत्र शर्त एवं क्रांतिक शोधन कोण निर्धारण', maxMarks: 6 },
        ],
        keyPointsEn: [
          'Swing Equation M d2delta/dt2 = Pm - Pe',
          'Area A1 (accelerating energy) = Area A2 (decelerating capacity)',
          'Post-fault power limit P_max2',
          'Critical clearing angle delta_cr',
        ],
        keyPointsHi: [
          'स्विंग समीकरण M d2delta/dt2 = Pm - Pe',
          'क्षेत्रफल A1 (त्वरण ऊर्जा) = क्षेत्रफल A2 (मंदन क्षमता)',
          'दोष पश्चात अधिकतम शक्ति अंतरण सीमा',
          'क्रांतिक दोष निवारण कोण delta_cr',
        ],
      },
    ],
  },
  {
    id: 'subj_ece_01',
    code: 'ECE-SUBJ-01',
    titleEn: 'Electronics & Communication Subjective Paper',
    titleHi: 'इलेक्ट्रॉनिक्स एवं संचार विवरणात्मक प्रश्नपत्र',
    branchCategory: 'ENGINEERING',
    branchNameEn: 'Electronics & Communication',
    branchNameHi: 'इलेक्ट्रॉनिक्स एवं संचार (ECE)',
    subTopics: ['Electronic Devices & Circuits', 'Communication Systems', 'Electromagnetics & Antennas'],
    subTopicsHi: ['इलेक्ट्रॉनिक युक्तियां एवं परिपथ', 'संचार प्रणालियां', 'विद्युत चुंबकत्व एवं एंटीना'],
    examTarget: 'GATE / ESE / ISRO / DRDO / State AE',
    durationMinutes: 180,
    totalMarks: 200,
    questionsCount: 5,
    isFree: false,
    priceInr: 199,
    attemptsCount: 2890,
    instructionsEn: [
      'Include schematics, band diagrams, wave equation formulations, and modulation spectra.',
      'Show clear mathematical derivations with step explanations.',
    ],
    instructionsHi: [
      'परिपथ रेखाचित्र, ऊर्जा बैंड आरेख, तरंग समीकरण एवं मॉडुलन स्पेक्ट्रम अनिवार्य रूप से सम्मिलित करें।',
      'स्पष्ट गणितीय व्युत्पत्ति एवं व्याख्या प्रस्तुत करें।',
    ],
    questions: [
      {
        id: 'q_ece_1',
        questionNumber: 1,
        titleEn:
          'Explain the working principle and energy band diagram of a p-n junction diode under forward bias, reverse bias, and equilibrium conditions. Derive the Shockley ideal diode equation.',
        titleHi:
          'अग्र अभिनति, पश्च अभिनति तथा साम्यावस्था में p-n संधि डायोड की कार्यप्रणाली एवं ऊर्जा बैंड आरेख स्पष्ट कीजिए। शॉक्ले आदर्श डायोड समीकरण का निगमन कीजिए।',
        marks: 20,
        wordLimit: 400,
        topicsCovered: ['Electronic Devices', 'Semiconductor Physics', 'Shockley Diode Equation'],
        difficulty: 'MODERATE',
        modelAnswerEn:
          '1. Thermal Equilibrium: Fermi level E_F is constant throughout. Built-in potential V_bi prevents majority carrier diffusion, resulting in zero net current.\n2. Forward Bias: Applied voltage V reduces the potential barrier to (V_bi - V). Minority carrier injection into neutral regions creates excess carrier concentrations that decay via recombination, generating exponential diffusion current.\n3. Reverse Bias: Applied voltage increases the barrier to (V_bi + V_R), blocking majority flow. Only thermally generated minority carriers contribute to the small reverse saturation current I_0.\n4. Shockley Equation Derivation: Solving continuity equations with boundary conditions gives I = I_0 * [exp(qV / (eta * k * T)) - 1].',
        modelAnswerHi:
          '1. तापीय साम्यावस्था: संपूर्ण क्रिस्टल में फर्मी स्तर E_F एक समान रहता है। आंतरिक विभव V_bi बहुसंख्यक वाहक विसरण को रोकता है, जिससे शुद्ध धारा शून्य होती है।\n2. अग्र अभिनति: बाह्य विभव V विभव प्राचीर को घटाकर (V_bi - V) कर देता है। अल्पसंख्यक वाहक अंतःक्षेपण से घातीय विसरण धारा उत्पन्न होती है।\n3. पश्च अभिनति: विभव प्राचीर बढ़कर (V_bi + V_R) हो जाती है। केवल तापीय रूप से उत्पन्न अल्पसंख्यक वाहक ही अतिअल्प पश्च संतृप्ति धारा I_0 का निर्माण करते हैं।\n4. शॉक्ले समीकरण: सातत्य समीकरणों के हल से I = I_0 * [exp(qV / (eta * k * T)) - 1] प्राप्त होता है।',
        evaluationRubric: [
          { criterionEn: 'Energy band diagrams for equilibrium, forward, and reverse bias', criterionHi: 'साम्यावस्था, अग्र एवं पश्च अभिनति के ऊर्जा बैंड आरेख', maxMarks: 8 },
          { criterionEn: 'Carrier diffusion and drift mechanisms explanation', criterionHi: 'वाहक विसरण एवं अपवाह तंत्र की व्याख्या', maxMarks: 6 },
          { criterionEn: 'Shockley equation derivation & temperature sensitivity', criterionHi: 'शॉक्ले समीकरण निगमन एवं ताप संवेदनशीलता', maxMarks: 6 },
        ],
        keyPointsEn: [
          'Flat Fermi level at equilibrium',
          'Barrier height reduction under forward bias',
          'Minority carrier injection profile',
          'I = I0 * (exp(qV/kT) - 1)',
        ],
        keyPointsHi: [
          'साम्यावस्था में समतल फर्मी स्तर',
          'अग्र अभिनति में प्राचीर ऊंचाई में कमी',
          'अल्पसंख्यक वाहक अंतःक्षेपण रूपरेखा',
          'डायोड धारा समीकरण I = I0 * (exp(qV/kT) - 1)',
        ],
      },
    ],
  },
  {
    id: 'subj_me_01',
    code: 'ME-SUBJ-01',
    titleEn: 'Mechanical Engineering Subjective Paper',
    titleHi: 'यांत्रिक अभियांत्रिकी विवरणात्मक प्रश्नपत्र',
    branchCategory: 'ENGINEERING',
    branchNameEn: 'Mechanical Engineering',
    branchNameHi: 'यांत्रिक अभियांत्रिकी (ME)',
    subTopics: ['Strength of Materials', 'Theory of Machines', 'Fluid Mechanics', 'Thermodynamics'],
    subTopicsHi: ['पदार्थ सामर्थ्य (SOM)', 'मशीन सिद्धांत (TOM)', 'तरल यांत्रिकी', 'ऊष्मागतिकी'],
    examTarget: 'GATE / ESE / BARC / SSC JE (ME) / State AE',
    durationMinutes: 180,
    totalMarks: 200,
    questionsCount: 5,
    isFree: true,
    attemptsCount: 3120,
    instructionsEn: [
      'Draw free-body diagrams (FBD), shear force & bending moment diagrams, or thermodynamic P-V/T-S cycles wherever applicable.',
      'State all assumptions clearly prior to algebraic derivations.',
    ],
    instructionsHi: [
      'मुक्त पिंड आरेख (FBD), कर्तन बल एवं बंकन आघूर्ण आरेख, अथवा ऊष्मागतिक P-V/T-S चक्र अनिवार्य रूप से बनाएं।',
      'बीजगणितीय निगमन से पूर्व सभी मान्यताओं को स्पष्ट रूप से लिखें।',
    ],
    questions: [
      {
        id: 'q_me_1',
        questionNumber: 1,
        titleEn:
          'Derive the Euler Bernoulli bending equation (M/I = sigma/y = E/R) stating all fundamental assumptions. Explain how the neutral axis and section modulus are defined.',
        titleHi:
          'सभी मौलिक मान्यताओं का उल्लेख करते हुए आयलर-बरनौली बंकन समीकरण (M/I = sigma/y = E/R) का निगमन कीजिए। उदासीन अक्ष (Neutral Axis) एवं परिच्छेद मापांक (Section Modulus) को परिभाषित कीजिए।',
        marks: 20,
        wordLimit: 400,
        topicsCovered: ['Strength of Materials', 'Pure Bending Theory'],
        difficulty: 'MODERATE',
        modelAnswerEn:
          '1. Assumptions: Material is isotropic and homogeneous; Hooke’s law holds; transverse sections remain planar before and after bending; radius of curvature is large compared to beam dimensions.\n2. Strain Derivation: Consider a fiber at distance y from the neutral surface: epsilon = (L\' - L) / L = ((R + y)*theta - R*theta) / (R*theta) = y / R.\n3. Stress Equation: Since sigma = E * epsilon, we have sigma = E * (y / R) => sigma / y = E / R.\n4. Moment of Resistance: The internal resisting moment M = Integral(sigma * y * dA) = (E / R) * Integral(y^2 * dA) = (E / R) * I. Hence: M / I = sigma / y = E / R.\n5. Neutral Axis & Section Modulus: The neutral axis passes through the centroid where bending stress is zero. Section modulus Z = I / y_max governs the maximum bending load capacity: M_max = sigma_allowable * Z.',
        modelAnswerHi:
          '1. मौलिक मान्यताएं: पदार्थ समांगी एवं समदैशिक है; हुक के नियम का पालन होता है; बंकन से पूर्व एवं पश्चात अनुप्रस्थ काट समतल रहते हैं; वक्रता त्रिज्या बीम की मोटाई की तुलना में बहुत बड़ी है।\n2. विकृति निगमन: उदासीन सतह से y दूरी पर स्थित रेशे में विकृति epsilon = y / R होती है।\n3. प्रतिबल संबंध: हुक के नियम से sigma = E * epsilon = E * (y / R) => sigma / y = E / R.\n4. प्रतिरोध आघूर्ण: आंतरिक आघूर्ण M = (E / R) * Integral(y^2 * dA) = (E / R) * I. अतः M / I = sigma / y = E / R.\n5. उदासीन अक्ष व परिच्छेद मापांक: उदासीन अक्ष वह रेखा है जहां बंकन प्रतिबल शून्य होता है और यह अनुप्रस्थ काट के गुरुत्व केंद्र से गुजरती है। परिच्छेद मापांक Z = I / y_max बीम की वहन क्षमता निर्धारित करता है।',
        evaluationRubric: [
          { criterionEn: 'Statement of pure bending assumptions', criterionHi: 'शुद्ध बंकन की मान्यताओं का स्पष्ट विवरण', maxMarks: 4 },
          { criterionEn: 'Step-by-step strain and moment derivation', criterionHi: 'विकृति एवं प्रतिरोध आघूर्ण का चरणबद्ध निगमन', maxMarks: 10 },
          { criterionEn: 'Neutral axis definition & Section Modulus significance', criterionHi: 'उदासीन अक्ष की परिभाषा एवं परिच्छेद मापांक का महत्व', maxMarks: 6 },
        ],
        keyPointsEn: [
          'Homogeneous, isotropic material obeying Hooke law',
          'Plane sections remain plane after bending',
          'Strain epsilon = y / R',
          'M / I = sigma / y = E / R',
          'Section Modulus Z = I / y_max',
        ],
        keyPointsHi: [
          'हुक के नियम का पालन करने वाला समांगी पदार्थ',
          'बंकन पश्चात समतल काट समतल ही रहते हैं',
          'विकृति epsilon = y / R',
          'आयलर समीकरण M / I = sigma / y = E / R',
          'परिच्छेद मापांक Z = I / y_max',
        ],
      },
    ],
  },
  {
    id: 'subj_ce_01',
    code: 'CE-SUBJ-01',
    titleEn: 'Civil Engineering Subjective Paper',
    titleHi: 'सिविल अभियांत्रिकी विवरणात्मक प्रश्नपत्र',
    branchCategory: 'ENGINEERING',
    branchNameEn: 'Civil Engineering',
    branchNameHi: 'सिविल अभियांत्रिकी (CE)',
    subTopics: ['Building Materials', 'Structural Analysis', 'RCC & Steel Design', 'Geotechnical Engineering'],
    subTopicsHi: ['भवन निर्माण सामग्री', 'संरचनात्मक विश्लेषण', 'आरसीसी एवं स्टील डिजाइन', 'भू-तकनीकी अभियांत्रिकी'],
    examTarget: 'GATE / ESE / SSC JE (CE) / State PSC AE',
    durationMinutes: 180,
    totalMarks: 200,
    questionsCount: 5,
    isFree: true,
    attemptsCount: 3890,
    instructionsEn: [
      'Follow IS 456:2000 and IS 800:2007 guidelines for limit state design.',
      'Show critical stress checks, reinforcement detailing sketches, and soil stability equations.',
    ],
    instructionsHi: [
      'सीमांत अवस्था डिजाइन हेतु IS 456:2000 एवं IS 800:2007 दिशानिर्देशों का पालन करें।',
      'क्रांतिक प्रतिबल जांच, सुदृढ़ीकरण (रीइन्फोर्समेंट) रेखाचित्र एवं मृदा स्थायित्व समीकरण अवश्य दर्शाएं।',
    ],
    questions: [
      {
        id: 'q_ce_1',
        questionNumber: 1,
        titleEn:
          'Explain the Limit State Method of design as per IS 456:2000. Differentiate between Limit State of Collapse and Limit State of Serviceability with appropriate examples and partial safety factors for loads and materials.',
        titleHi:
          'IS 456:2000 के अनुसार सीमांत अवस्था डिजाइन पद्धति की व्याख्या कीजिए। भारों एवं सामग्रियों हेतु आंशिक सुरक्षा गुणांकों के साथ निपात की सीमांत अवस्था (Collapse) तथा सेवायोग्यता की सीमांत अवस्था (Serviceability) में अंतर स्पष्ट कीजिए।',
        marks: 20,
        wordLimit: 400,
        topicsCovered: ['RCC Design', 'IS 456 Limit State Philosophy'],
        difficulty: 'MODERATE',
        modelAnswerEn:
          '1. Limit State Philosophy: The Limit State method ensures an acceptable probability that a structure will not become unfit for its intended use during its lifetime.\n2. Limit State of Collapse: Corresponds to structural stability and safety against failure under extreme loads. Sub-categories include Flexure, Compression, Shear, and Torsion. Material partial safety factors: gamma_c = 1.5 for concrete, gamma_s = 1.15 for steel. Load combinations include 1.5(DL + LL) or 1.2(DL + LL + WL/EL).\n3. Limit State of Serviceability: Ensures candidate comfort and functional durability during normal service loads. Major checks include Deflection (to prevent cracking of finishes) and Cracking (surface crack width limited to 0.3mm in mild environments). For serviceability, partial load factor is taken as 1.0 (gamma_f = 1.0).\n4. Advantages: Combines ultimate load capacity with realistic non-linear stress-strain behavior while safeguarding everyday operational performance.',
        modelAnswerHi:
          '1. सीमांत अवस्था दर्शन: यह पद्धति सुनिश्चित करती है कि संरचना अपने संपूर्ण सेवाकाल में उपयोग हेतु सुरक्षित, मजबूत एवं टिकाऊ बनी रहे।\n2. निपात की सीमांत अवस्था (Collapse): यह अत्यधिक भार के तहत संरचना की स्थिरता एवं सुरक्षा से संबंधित है। इसमें नमन (Flexure), संपीड़न, कर्तन (Shear) और मरोड़ (Torsion) शामिल हैं। पदार्थ सुरक्षा गुणांक: कंक्रीट हेतु gamma_c = 1.5, स्टील हेतु gamma_s = 1.15. भार संयोजन 1.5(DL + LL) लिया जाता है।\n3. सेवायोग्यता की सीमांत अवस्था (Serviceability): यह सामान्य परिचालन भारों के तहत संरचना की उपयोगिता, विक्षेप (Deflection) एवं दरारों (Cracking) के नियंत्रण को सुनिश्चित करती है। इसमें भार गुणांक gamma_f = 1.0 लिया जाता है।\n4. महत्व: यह कार्यशील प्रतिबल विधि की तुलना में अधिक वैज्ञानिक एवं किफायती डिजाइन प्रदान करती है।',
        evaluationRubric: [
          { criterionEn: 'Conceptual basis of Limit State Method', criterionHi: 'सीमांत अवस्था पद्धति का वैचारिक आधार', maxMarks: 6 },
          { criterionEn: 'Comparison: Collapse vs Serviceability limit states', criterionHi: 'निपात बनाम सेवायोग्यता सीमांत अवस्था तुलना', maxMarks: 8 },
          { criterionEn: 'Partial safety factors for materials & load combinations', criterionHi: 'पदार्थों एवं भारों हेतु आंशिक सुरक्षा गुणांक', maxMarks: 6 },
        ],
        keyPointsEn: [
          'IS 456:2000 Limit state framework',
          'Collapse: Flexure, Shear, Compression (gamma_c=1.5, gamma_s=1.15)',
          'Serviceability: Deflection, Cracking, Vibration (gamma_f=1.0)',
          'Maximum crack width limits',
        ],
        keyPointsHi: [
          'IS 456:2000 सीमांत अवस्था प्रारूप',
          'निपात: नमन, कर्तन, संपीड़न (कंक्रीट 1.5, स्टील 1.15)',
          'सेवायोग्यता: विक्षेप, दरार, कंपन (भार गुणांक 1.0)',
          'अधिकतम अनुमेय दरार चौड़ाई सीमाएं',
        ],
      },
    ],
  },

  // ==========================================
  // 2. GENERAL & LANGUAGE DESCRIPTIVE PAPERS
  // ==========================================
  {
    id: 'subj_gen_eng_01',
    code: 'GEN-ENG-DESC-01',
    titleEn: 'English Language & Descriptive Writing (Essay, Letter & Precis)',
    titleHi: 'अंग्रेजी भाषा एवं विवरणात्मक लेखन (निबंध, पत्र एवं संक्षेपण)',
    branchCategory: 'GENERAL_LANGUAGE',
    branchNameEn: 'English Descriptive Writing',
    branchNameHi: 'अंग्रेजी विवरणात्मक लेखन',
    subTopics: ['Formal & Informal Letter Drafting', 'Theme Essay Writing (250-300 Words)', 'Precis Writing & Title Formulation'],
    subTopicsHi: ['औपचारिक एवं अनौपचारिक पत्र प्रारूपण', 'थीम निबंध लेखन (250-300 शब्द)', 'संक्षेपण (Precis) लेखन एवं शीर्षक'],
    examTarget: 'IBPS PO / SBI PO / SSC CGL Tier-3 / RBI Grade B',
    durationMinutes: 60,
    totalMarks: 50,
    questionsCount: 3,
    isFree: true,
    attemptsCount: 8450,
    instructionsEn: [
      'Adhere strictly to the prescribed word limit (+/- 10% tolerance).',
      'Maintain formal register, grammatical accuracy, clear paragraphing, and logical coherence.',
    ],
    instructionsHi: [
      'निर्धारित शब्द सीमा (+/- 10%) का कड़ाई से पालन करें।',
      'औपचारिक भाषा, व्याकरणिक शुद्धता, स्पष्ट अनुच्छेद एवं तार्किक क्रमबद्धता बनाए रखें।',
    ],
    questions: [
      {
        id: 'q_eng_essay',
        questionNumber: 1,
        titleEn:
          'Write an essay on: "Financial Inclusion through Digital Public Infrastructure: Opportunities and Cyber-Risks for Rural India" in about 250 words.',
        titleHi:
          'लगभग 250 शब्दों में निबंध लिखिए: "डिजिटल सार्वजनिक अवसंरचना द्वारा वित्तीय समावेशन: ग्रामीण भारत के लिए अवसर एवं साइबर जोखिम"।',
        marks: 25,
        wordLimit: 250,
        topicsCovered: ['Essay Writing', 'Fintech & Economy', 'Digital India'],
        difficulty: 'MODERATE',
        modelAnswerEn:
          'Introduction: Digital Public Infrastructure (DPI)—powered by the JAM trinity (Jan Dhan, Aadhaar, Mobile) and UPI—has revolutionized financial inclusion across India, onboarding millions of rural citizens into formal banking channels.\n\nOpportunities: The democratization of digital payments has drastically lowered transaction friction for small farmers, self-help groups, and rural MSMEs. Direct Benefit Transfers (DBT) ensure zero leakages in subsidy welfare delivery, while digital credit assessment allows collateral-free micro-lending to hitherto unbanked artisans.\n\nCyber-Risks & Challenges: However, rapid digital adoption without corresponding financial literacy has exposed vulnerable rural populations to phishing scams, identity theft, unauthorized biometric spoofing, and predatory instant loan apps. Language barriers and inadequate grievance redressal mechanisms exacerbate candidate vulnerability.\n\nWay Forward: Strengthening multi-lingual cybersecurity awareness, implementing AI-driven anomaly detection, and expanding local banking correspondence networks are imperative to ensure a secure, equitable financial horizon for rural India.',
        modelAnswerHi:
          'प्रस्तावना: डिजिटल सार्वजनिक अवसंरचना (DPI)—विशेषकर जैम ट्रिनिटी (जन धन, आधार, मोबाइल) एवं यूपीआई—ने भारत में वित्तीय समावेशन में ऐतिहासिक क्रांति ला दी है।\n\nअवसर: डिजिटल भुगतान के लोकतंत्रीकरण ने छोटे किसानों एवं ग्रामीण उद्यमियों के लेनदेन को सुगम बना दिया है। प्रत्यक्ष लाभ अंतरण (DBT) से कल्याणकारी योजनाओं में लीकेज समाप्त हुआ है।\n\nजोखिम एवं चुनौतियां: किंतु, सीमित वित्तीय साक्षरता के कारण ग्रामीण आबादी फिशिंग घोटालों, डिजिटल फ्रॉड और फर्जी ऋण ऐप का शिकार हो रही है। भाषाई बाधाएं और शिकायत निवारण में देरी प्रमुख चिंताएं हैं।\n\nनिष्कर्ष: बहुभाषी साइबर जागरूकता, कड़े सुरक्षा प्रोटोकॉल एवं स्थानीय बैंकिंग मित्रों का सशक्तिकरण एक सुरक्षित एवं समावेशी ग्रामीण डिजिटल भारत के निर्माण हेतु अत्यंत आवश्यक है।',
        evaluationRubric: [
          { criterionEn: 'Introduction and relevance to socio-economic context', criterionHi: 'प्रस्तावना एवं सामाजिक-आर्थिक प्रासंगिकता', maxMarks: 7 },
          { criterionEn: 'Balanced analysis of opportunities vs cyber threats', criterionHi: 'अवसरों बनाम साइबर खतरों का संतुलित विश्लेषण', maxMarks: 10 },
          { criterionEn: 'Grammar, vocabulary, coherence and forward-looking conclusion', criterionHi: 'व्याकरण, शब्द-चयन, सुसंगतता एवं समाधानोन्मुख निष्कर्ष', maxMarks: 8 },
        ],
        keyPointsEn: [
          'JAM trinity and UPI as catalyst for rural inclusion',
          'Direct Benefit Transfer (DBT) and credit access',
          'Cyber scams, phishing, and digital illiteracy challenges',
          'Multi-lingual awareness and robust grievance redressal',
        ],
        keyPointsHi: [
          'जैम ट्रिनिटी व यूपीआई की भूमिका',
          'डीबीटी द्वारा पारदर्शी सब्सिडी वितरण',
          'साइबर धोखाधड़ी एवं डिजिटल अशिक्षा की चुनौतियां',
          'बहुभाषी जागरूकता व सुदृढ़ शिकायत निवारण',
        ],
      },
    ],
  },
  {
    id: 'subj_gen_hindi_01',
    code: 'GEN-HINDI-DESC-01',
    titleEn: 'General Hindi & Descriptive Drafting (सामान्य हिंदी एवं विवरणात्मक प्रारूपण)',
    titleHi: 'सामान्य हिंदी एवं विवरणात्मक प्रारूपण (निबंध, शासकीय पत्र, संक्षेपण)',
    branchCategory: 'GENERAL_LANGUAGE',
    branchNameEn: 'General Hindi & Drafting',
    branchNameHi: 'सामान्य हिंदी एवं प्रारूपण',
    subTopics: ['शासकीय एवं अर्धशासकीय पत्र', 'प्रशासनिक पारिभाषिक शब्दावली', 'निबंध लेखन', 'अपठित गद्यांश एवं संक्षेपण'],
    subTopicsHi: ['शासकीय एवं अर्धशासकीय पत्र', 'प्रशासनिक पारिभाषिक शब्दावली', 'निबंध लेखन', 'अपठित गद्यांश एवं संक्षेपण'],
    examTarget: 'MPPSC Mains / State PSC / UPPSC / Police SI',
    durationMinutes: 120,
    totalMarks: 100,
    questionsCount: 4,
    isFree: true,
    attemptsCount: 7800,
    instructionsEn: [
      'Draft official correspondence conforming to standard governmental formats and administrative lexicon.',
      'Maintain pristine Hindi orthography, punctuation, and formal administrative decorum.',
    ],
    instructionsHi: [
      'मानक शासकीय प्रारूप एवं प्रशासनिक शब्दावली का उपयोग करते हुए पत्र प्रारूप तैयार करें।',
      'वर्तनी की शुद्धता, विराम चिह्नों एवं औपचारिक प्रशासनिक गरिमा का विशेष ध्यान रखें।',
    ],
    questions: [
      {
        id: 'q_hi_letter',
        questionNumber: 1,
        titleEn:
          'Draft an Official Government Notification (शासकीय परिपत्र) from the Chief Secretary to all District Collectors regarding immediate drought mitigation and rural employment generation measures.',
        titleHi:
          'मुख्य सचिव, सामान्य प्रशासन विभाग द्वारा सभी जिला कलेक्टरों को तात्कालिक सूखा राहत एवं ग्रामीण रोजगार सृजन के उपायों के क्रियान्वयन हेतु एक शासकीय परिपत्र (Circular) का प्रारूप तैयार कीजिए।',
        marks: 25,
        wordLimit: 250,
        topicsCovered: ['शासकीय पत्र लेखन', 'प्रशासनिक प्रारूपण'],
        difficulty: 'MODERATE',
        modelAnswerEn:
          'Official Circular Format:\n1. Letterhead: Government of Madhya Pradesh, General Administration Department, Vallabh Bhawan, Bhopal.\n2. Letter No. & Date: Circular No. F-12/2026/GAD/ राहत, Date: 08 September 2026.\n3. Recipient: All District Collectors and District Magistrates, Madhya Pradesh.\n4. Subject: Regarding immediate implementation of drought relief measures and MNREGA employment generation in scarcity-hit tehsils.\n5. Body: Reference to meteorological alerts; directives for 24/7 drinking water supply tankers; accelerated issuance of MNREGA job cards; immediate dispatch of fodder reserves; weekly review meetings.\n6. Signature & Designation: (Er. Sachin Tripathi), Chief Secretary, Govt of MP.\n7. Endorsement / Copy to: Divisional Commissioners and Agriculture Department.',
        modelAnswerHi:
          'मध्य प्रदेश शासन\nसामान्य प्रशासन विभाग\nमंत्रालय, वल्लभ भवन, भोपाल\n\nक्रमांक: एफ-12/2026/सा.प्र.वि./राहत\t\t\t\t\t\tदिनांक: 08 सितम्बर 2026\n\nपरिपत्र\n\nप्रति,\nसमस्त जिला कलेक्टर एवं जिला दंडाधिकारी,\nमध्य प्रदेश।\n\nविषय: सूखा प्रभावित तहसीलों में तात्कालिक पेयजल आपूर्ति, चारा प्रबंधन एवं मनरेगा अंतर्गत रोजगार सृजन बाबत।\n\nमौसम विभाग के हालिया प्रतिवेदन के परिप्रेक्ष्य में शासन द्वारा निर्देशित किया जाता है कि:\n1. प्रत्येक सूखा प्रभावित ग्राम में टैंकरों द्वारा स्वच्छ पेयजल की निर्बाध आपूर्ति सुनिश्चित की जाए।\n2. मनरेगा अंतर्गत जल संरक्षण एवं चेकडैम निर्माण के नए कार्य तत्काल स्वीकृत कर जरूरतमंद श्रमिकों को शत-प्रतिशत रोजगार उपलब्ध कराया जाए।\n3. पशुधन संरक्षण हेतु चारे के सुरक्षित भंडारण एवं वितरण का दैनिक अनुश्रवण किया जाए।\n\nकलेक्टर महोदय साप्ताहिक समीक्षा बैठक आयोजित कर प्रगति प्रतिवेदन प्रत्येक सोमवार को प्रेषित करना सुनिश्चित करें।\n\nहस्ताक्षर/-\n(मुख्य सचिव)\nमध्य प्रदेश शासन',
        evaluationRubric: [
          { criterionEn: 'Standard government notification format adherence', criterionHi: 'मानक शासकीय परिपत्र प्रारूप एवं क्रमांक-दिनांक संरचना', maxMarks: 8 },
          { criterionEn: 'Clarity, conciseness of administrative directives', criterionHi: 'प्रशासनिक निर्देशों की स्पष्टता एवं सारगर्भिता', maxMarks: 10 },
          { criterionEn: 'Formal administrative vocabulary & linguistic precision', criterionHi: 'राजभाषा शब्दावली, वर्तनी एवं विवरणात्मक शुद्धि', maxMarks: 7 },
        ],
        keyPointsEn: [
          'Official letterhead, file number and date alignment',
          'Clear subject line stating drought relief directives',
          'Enumerated action items (drinking water, MNREGA, fodder)',
          'Signature, designation, and copy endorsements',
        ],
        keyPointsHi: [
          'शासन का शीर्ष, पत्र क्रमांक एवं दिनांक का सही अंकन',
          'स्पष्ट विषय पंक्ति एवं परिपत्र संबोधन',
          'बिंदुवार प्रशासनिक निर्देश (पेयजल, मनरेगा मजदूरी, पशु चारा)',
          'हस्ताक्षर, पदनाम एवं प्रतिलिपि पृष्ठांकन',
        ],
      },
    ],
  },
  {
    id: 'subj_gs_paper1_01',
    code: 'GS-PAPER1-01',
    titleEn: 'General Studies Paper-1 (History, Geography & State GK Subjective)',
    titleHi: 'सामान्य अध्ययन प्रश्नपत्र-1 (इतिहास, भूगोल एवं राज्य सामान्य ज्ञान)',
    branchCategory: 'GENERAL_LANGUAGE',
    branchNameEn: 'General Studies Paper-1',
    branchNameHi: 'सामान्य अध्ययन प्रश्नपत्र-1',
    subTopics: ['Ancient & Modern Indian History', 'Physical & Human Geography', 'State Historical Heritage & Culture'],
    subTopicsHi: ['प्राचीन एवं आधुनिक भारतीय इतिहास', 'भौतिक एवं मानव भूगोल', 'राज्य की ऐतिहासिक विरासत एवं संस्कृति'],
    examTarget: 'UPSC CSE / MPPSC Mains / State PSCs',
    durationMinutes: 180,
    totalMarks: 200,
    questionsCount: 5,
    isFree: true,
    attemptsCount: 6540,
    instructionsEn: [
      'Support geographical answers with sketch maps and historical answers with timeline milestones.',
      'Answer strictly within the allocated 150/250 word bounds.',
    ],
    instructionsHi: [
      'भौगोलिक उत्तरों में रेखाचित्र/मानचित्र तथा ऐतिहासिक उत्तरों में कालक्रम मील के पत्थरों का उल्लेख करें।',
      '150/250 शब्दों की सीमा का कठोरतापूर्वक पालन करें।',
    ],
    questions: [
      {
        id: 'q_gs1_1',
        questionNumber: 1,
        titleEn:
          'Critically examine the architectural and sculptural highlights of Khajuraho temples with special emphasis on the Nagara style of temple architecture.',
        titleHi:
          'नागर शैली की मंदिर वास्तुकला के विशेष संदर्भ में खजुराहो के मंदिरों की स्थापत्य एवं मूर्तिकलागत विशेषताओं का आलोचनात्मक परीक्षण कीजिए।',
        marks: 15,
        wordLimit: 250,
        topicsCovered: ['Indian Art & Architecture', 'Nagara Style', 'Chandela Dynasty'],
        difficulty: 'MODERATE',
        modelAnswerEn:
          '1. Historical Context: Built between 950–1050 CE by the Chandela rulers in Bundelkhand, Khajuraho represents the pinnacle of Nagara-style temple architecture in Central India (UNESCO World Heritage Site).\n2. Architectural Features: Unlike southern temples, Khajuraho temples lack boundary walls or gopurams. They are built on high masonry plinths (Jagati). They follow a unified plan featuring Ardhamandapa, Mandapa, Mahamandapa, Antarala, and Garbhagriha connected sequentially.\n3. Shikhara (Superstructure): The main tower resembles a mountain range (Kailasa motif), surrounded by rhythmic subsidiary mini-spires (Urushringas) ascending to the Amalaka and Kalasha, generating upward spiritual dynamism (e.g., Kandariya Mahadeva Temple).\n4. Sculptural Marvel: Temples showcase the four Purusharthas (Dharma, Artha, Kama, Moksha). Outer walls exhibit detailed mithuna couples, celestial nymphs (Apsaras), daily socio-cultural life, and war friezes, embodying cosmic life balance rather than mere sensuality.',
        modelAnswerHi:
          '1. ऐतिहासिक संदर्भ: चंदेल शासकों द्वारा 950-1050 ईस्वी के मध्य निर्मित खजुराहो के मंदिर मध्य भारत की नागर शैली के सर्वश्रेष्ठ उदाहरण हैं (यूनेस्को विश्व धरोहर)।\n2. स्थापत्य विशेषताएं: ये मंदिर विस्तृत परकोटे या गोपुरम से रहित हैं तथा एक ऊंचे चबूतरे (जगती) पर स्थित हैं। इनकी योजना में अर्धमंडप, मंडप, महामंडप, अंतराल एवं गर्भगृह परस्पर जुड़े हुए हैं।\n3. शिखर विन्यास: मुख्य शिखर पर्वत शृंखला (कैलाश पर्वत) सदृश प्रतीत होता है, जिसके चारों ओर उरुशृंग (छोटे शिखर) लयबद्ध रूप से आमलक और कलश की ओर बढ़ते हैं (उदा. कंदरिया महादेव मंदिर)।\n4. मूर्तिकलागत सौंदर्य: मूर्तियों में चारों पुरुषार्थों (धर्म, अर्थ, काम, मोक्ष) का समन्वय है। बाहरी भित्तियों पर सुर-सुंदरी, अप्सराएं, मिथुन मूर्तियां तथा जनजीवन के विविध दृश्य जीवन के समग्र दर्शन को उद्घाटित करते हैं।',
        evaluationRubric: [
          { criterionEn: 'Chandela patronage and Nagara structural layout (Jagati, Shikhara)', criterionHi: 'चंदेल काल एवं नागर योजना (जगती, मंडप, शिखर विन्यास)', maxMarks: 6 },
          { criterionEn: 'Analysis of Urushringas and sculptural symbolism (Purusharthas)', criterionHi: 'उरुशृंग एवं मूर्तिकला के दार्शनिक भाव (पुरुषार्थ)', maxMarks: 6 },
          { criterionEn: 'Artistic critique and prominent temple examples (Kandariya Mahadeva)', criterionHi: 'कलात्मक समीक्षा एवं प्रमुख उदाहरण (कंदरिया महादेव)', maxMarks: 3 },
        ],
        keyPointsEn: [
          'Chandela dynasty 10th-11th century',
          'Panchayatana layout on high Jagati',
          'Curvilinear Shikhara with miniature Urushringas',
          'Integration of Kama and Moksha in sculptural relief',
        ],
        keyPointsHi: [
          'चंदेल राजवंश कालीन निर्माण (10वीं-11वीं सदी)',
          'उच्च जगती पर निर्मित पंचायतन शैली',
          'उरुशृंगों से सुसज्जित वक्राकार शिखर',
          'मूर्तिकला में काम एवं मोक्ष का सामंजस्यपूर्ण दर्शन',
        ],
      },
    ],
  },
  {
    id: 'subj_gs_paper2_01',
    code: 'GS-PAPER2-01',
    titleEn: 'General Studies Paper-2 (Polity, Constitution & Public Administration Subjective)',
    titleHi: 'सामान्य अध्ययन प्रश्नपत्र-2 (राजव्यवस्था, संविधान एवं लोक प्रशासन)',
    branchCategory: 'GENERAL_LANGUAGE',
    branchNameEn: 'General Studies Paper-2',
    branchNameHi: 'सामान्य अध्ययन प्रश्नपत्र-2',
    subTopics: ['Constitutional Framework & Federalism', 'Judicial Review & Fundamental Rights', 'Public Administration & Good Governance'],
    subTopicsHi: ['संवैधानिक ढांचा एवं संघवाद', 'न्यायिक समीक्षा एवं मौलिक अधिकार', 'लोक प्रशासन एवं सुशासन'],
    examTarget: 'UPSC CSE / MPPSC Mains / State PSCs',
    durationMinutes: 180,
    totalMarks: 200,
    questionsCount: 5,
    isFree: true,
    attemptsCount: 6100,
    instructionsEn: [
      'Cite constitutional articles, landmark Supreme Court precedents, and administrative reform commissions.',
      'Demonstrate analytical balance on federal tensions.',
    ],
    instructionsHi: [
      'संवैधानिक अनुच्छेदों, सर्वोच्च न्यायालय के ऐतिहासिक निर्णयों एवं प्रशासनिक सुधार आयोगों के सुझावों का उल्लेख करें।',
      'संघीय संतुलन एवं समकालीन मुद्दों पर निष्पक्ष विश्लेषण प्रस्तुत करें।',
    ],
    questions: [
      {
        id: 'q_gs2_1',
        questionNumber: 1,
        titleEn:
          'Discuss the constitutional scope and emerging judicial safeguards concerning the appointment, role, and discretionary powers of the Governor under Article 163 of the Indian Constitution.',
        titleHi:
          'भारतीय संविधान के अनुच्छेद 163 के तहत राज्यपाल की नियुक्ति, भूमिका एवं विवेकाधीन शक्तियों से संबंधित संवैधानिक दायरे तथा उभरते न्यायिक सुरक्षा उपायों की विवेचना कीजिए।',
        marks: 15,
        wordLimit: 250,
        topicsCovered: ['Indian Polity', 'Governor Office', 'Article 163', 'Federalism'],
        difficulty: 'MODERATE',
        modelAnswerEn:
          '1. Constitutional Position: Under Article 153 and 163, the Governor acts as both the constitutional head of the state and the vital link between Union and States. While Article 163(1) mandates acting on the aid and advice of the Council of Ministers, Article 163(2) grants discretionary powers.\n2. Controversial Discretions: Frictions arise regarding: (a) Hung assembly government formation and choosing the Chief Minister; (b) Reservation of state bills for the President under Article 200; (c) Recommending President\'s Rule under Article 356.\n3. Judicial Safeguards: In Shamsher Singh (1974) and S.R. Bommai (1994), the Supreme Court ruled that gubernatorial discretion is not unfettered and is subject to judicial review. In Nabam Rebia (2016), the Court held that summoning the assembly without cabinet advice is unconstitutional unless the government loses majority.\n4. Commission Recommendations: Sarkaria and Punchhi Commissions recommended that the Governor should remain an eminent, non-partisan figure appointed following consultation with the Chief Minister.',
        modelAnswerHi:
          '1. संवैधानिक स्थिति: अनुच्छेद 153 एवं 163 के तहत राज्यपाल राज्य का संवैधानिक प्रमुख होने के साथ-साथ केंद्र एवं राज्य के मध्य संपर्क सेतु है। अनुच्छेद 163(1) के अनुसार सामान्यतः राज्यपाल मंत्रिपरिषद की सलाह पर कार्य करता है, किंतु 163(2) उसे स्वविवेक की शक्ति देता है।\n2. विवाद के बिंदु: (क) त्रिशंकु विधानसभा में सरकार गठन व बहुमत परीक्षण; (ख) अनुच्छेद 200 के तहत राज्य विधेयकों को राष्ट्रपति हेतु सुरक्षित रखना या अनिश्चितकाल तक रोके रखना; (ग) अनुच्छेद 356 के तहत राष्ट्रपति शासन की सिफारिश।\n3. न्यायिक सुरक्षा उपाय: शमशेर सिंह (1974) तथा एस.आर. बोम्मई (1994) वाद में स्पष्ट किया गया कि राज्यपाल की शक्तियां असीमित नहीं हैं और वे न्यायिक समीक्षा के अधीन हैं। नबाम रेबिया (2016) में व्यवस्था दी गई कि विधानसभा सत्र आहूत करना कैबिनेट की सलाह पर ही संभव है।\n4. आयोगों की सिफारिशें: सरकारिया एवं पुंछी आयोग ने स्पष्ट किया कि राज्यपाल को गैर-दलीय, निष्पक्ष व्यक्तित्व होना चाहिए।',
        evaluationRubric: [
          { criterionEn: 'Constitutional basis of Article 163 & discretionary realms', criterionHi: 'अनुच्छेद 163 का संवैधानिक आधार एवं विवेकाधिकार क्षेत्र', maxMarks: 5 },
          { criterionEn: 'Critical case laws (Bommai, Nabam Rebia, Shamsher Singh)', criterionHi: 'महत्वपूर्ण न्यायिक वाद (बोम्मई, नबाम रेबिया, शमशेर सिंह)', maxMarks: 6 },
          { criterionEn: 'Sarkaria/Punchhi commission recommendations and way forward', criterionHi: 'सरकारिया/पुंछी आयोग की सिफारिशें व सुधारवादी निष्कर्ष', maxMarks: 4 },
        ],
        keyPointsEn: [
          'Article 163 aid and advice vs discretion',
          'S.R. Bommai case on floor test primacy',
          'Nabam Rebia case on assembly summoning limits',
          'Punchhi Commission guidelines on non-partisan tenure',
        ],
        keyPointsHi: [
          'अनुच्छेद 163: मंत्रिपरिषद की सलाह बनाम विवेकाधिकार',
          'एस.आर. बोम्मई वाद: सदन के पटल पर शक्ति परीक्षण',
          'नबाम रेबिया वाद: सत्र आहूत करने की सीमाएं',
          'पुंछी आयोग: निष्पक्ष कार्यकाल एवं निष्कासन प्रक्रिया',
        ],
      },
    ],
  },
  {
    id: 'subj_gs_paper3_01',
    code: 'GS-PAPER3-01',
    titleEn: 'General Studies Paper-3 (Science, Technology, Economy & Environment Subjective)',
    titleHi: 'सामान्य अध्ययन प्रश्नपत्र-3 (विज्ञान, प्रौद्योगिकी, अर्थव्यवस्था एवं पर्यावरण)',
    branchCategory: 'GENERAL_LANGUAGE',
    branchNameEn: 'General Studies Paper-3',
    branchNameHi: 'सामान्य अध्ययन प्रश्नपत्र-3',
    subTopics: ['Macroeconomics & Fiscal Policy', 'Renewable Energy & Climate Action', 'AI, Space Tech & Biotechnology'],
    subTopicsHi: ['समष्टि अर्थशास्त्र एवं राजकोषीय नीति', 'नवीकरणीय ऊर्जा एवं जलवायु परिवर्तन', 'एआई, अंतरिक्ष प्रौद्योगिकी एवं जैव प्रौद्योगिकी'],
    examTarget: 'UPSC CSE / MPPSC Mains / State PSCs',
    durationMinutes: 180,
    totalMarks: 200,
    questionsCount: 5,
    isFree: true,
    attemptsCount: 5980,
    instructionsEn: [
      'Synthesize economic data, climate targets (COP28 / Net Zero 2070), and technology roadmap metrics.',
      'Maintain structural clarity with bulleted interventions.',
    ],
    instructionsHi: [
      'आर्थिक आंकड़े, जलवायु लक्ष्य (COP28 / नेट जीरो 2070) तथा तकनीकी संकेतकों का संतुलित संयोजन करें।',
      'बिंदुवार समाधान एवं स्पष्टता बनाए रखें।',
    ],
    questions: [
      {
        id: 'q_gs3_1',
        questionNumber: 1,
        titleEn:
          'Analyze India’s strategy toward achieving Net-Zero greenhouse gas emissions by 2070 with focus on the National Green Hydrogen Mission and renewable energy grid integration challenges.',
        titleHi:
          'राष्ट्रीय हरित हाइड्रोजन मिशन एवं नवीकरणीय ऊर्जा ग्रिड एकीकरण की चुनौतियों पर विशेष ध्यान देते हुए वर्ष 2070 तक शुद्ध-शून्य (Net-Zero) उत्सर्जन प्राप्त करने की भारत की रणनीति का विश्लेषण कीजिए।',
        marks: 15,
        wordLimit: 250,
        topicsCovered: ['Climate Change', 'Green Hydrogen', 'Renewable Energy Grid', 'Economy'],
        difficulty: 'MODERATE',
        modelAnswerEn:
          '1. Panchamrit Commitments: India committed at COP26 to achieve 500 GW non-fossil capacity by 2030, 50% energy from renewables, reduce emissions intensity by 45%, and reach Net-Zero by 2070.\n2. Role of National Green Hydrogen Mission: Targeting 5 MMT annual production by 2030, green hydrogen aims to decarbonize hard-to-abate heavy industries like steel, fertilizers, long-haul shipping, and petrochemical refining.\n3. Grid Integration Challenges: Renewable sources (solar/wind) are inherently intermittent, creating frequency fluctuation and Duck Curve phenomena. Deficits in battery energy storage systems (BESS) and pumped-storage hydro constrain peak dispatch.\n4. Strategic Road Ahead: Accelerated deployment of smart grids, green energy corridors, viable gap funding for utility-scale battery storage, and dynamic tariff policies are critical for sustainable decarbonization.',
        modelAnswerHi:
          '1. पंचामृत प्रतिबद्धताएं: भारत ने 2030 तक 500 GW गैर-जीवाश्म ऊर्जा क्षमता, 50% नवीकरणीय ऊर्जा हिस्सेदारी तथा 2070 तक नेट-जीरो उत्सर्जन का लक्ष्य रखा है।\n2. राष्ट्रीय हरित हाइड्रोजन मिशन: वर्ष 2030 तक 5 MMT वार्षिक उत्पादन का लक्ष्य स्टील, उर्वरक और रिफाइनरी जैसे उद्योगों के डीकार्बोनाइजेशन में निर्णायक सिद्ध होगा।\n3. ग्रिड एकीकरण की चुनौतियां: सौर एवं पवन ऊर्जा की अनिश्चितता से ग्रिड आवृत्ति में उतार-चढ़ाव (डक कर्व) आता है। उन्नत बैटरी भंडारण (BESS) एवं पंप-हाइड्रो परियोजनाओं की उच्च प्रारंभिक लागत प्रमुख बाधा है।\n4. समाधान: हरित ऊर्जा गलियारा (GEC), स्मार्ट ग्रिड तकनीक, ग्रिड-स्तरीय बैटरी भंडारण को वित्तीय प्रोत्साहन तथा अंतरराष्ट्रीय जलवायु वित्त का दोहन अनिवार्य है।',
        evaluationRubric: [
          { criterionEn: 'Panchamrit targets and Net Zero 2070 roadmap', criterionHi: 'पंचामृत लक्ष्य एवं नेट जीरो 2070 कार्ययोजना', maxMarks: 5 },
          { criterionEn: 'National Green Hydrogen Mission application in heavy industry', criterionHi: 'भारी उद्योगों में राष्ट्रीय हरित हाइड्रोजन मिशन का योगदान', maxMarks: 5 },
          { criterionEn: 'Grid intermittency challenges and storage solutions', criterionHi: 'ग्रिड अनिश्चितता की चुनौतियां एवं बैटरी/पंप भंडारण समाधान', maxMarks: 5 },
        ],
        keyPointsEn: [
          'COP26 Panchamrit goals & 500 GW non-fossil target',
          '5 MMT green hydrogen target by 2030',
          'Hard-to-abate sectors: steel, fertilizers, refineries',
          'Intermittency, Duck curve, and BESS solutions',
        ],
        keyPointsHi: [
          'कॉप26 पंचामृत लक्ष्य व 500 गीगावाट लक्ष्य',
          '2030 तक 5 MMT हरित हाइड्रोजन उत्पादन',
          'कठिन क्षेत्र: इस्पात, उर्वरक एवं रिफाइनरी',
          'ऊर्जा अनिश्चितता, डक कर्व तथा बैटरी स्टोरेज',
        ],
      },
    ],
  },
  {
    id: 'subj_gs_paper4_01',
    code: 'GS-PAPER4-01',
    titleEn: 'General Studies Paper-4 (Ethics, Integrity & Case Studies Descriptive)',
    titleHi: 'सामान्य अध्ययन प्रश्नपत्र-4 (नीतिशास्त्र, सत्यनिष्ठा एवं केस स्टडीज)',
    branchCategory: 'GENERAL_LANGUAGE',
    branchNameEn: 'General Studies Paper-4',
    branchNameHi: 'सामान्य अध्ययन प्रश्नपत्र-4',
    subTopics: ['Ethics in Public Administration', 'Probity in Governance & Conflict of Interest', 'Practical Administrative Case Studies'],
    subTopicsHi: ['लोक प्रशासन में नीतिशास्त्र', 'शासन में शुचिता एवं हितों का टकराव', 'प्रशासनिक केस स्टडीज एवं निर्णय निर्माण'],
    examTarget: 'UPSC CSE / MPPSC Mains / State PSCs',
    durationMinutes: 180,
    totalMarks: 200,
    questionsCount: 5,
    isFree: true,
    attemptsCount: 7100,
    instructionsEn: [
      'Identify ethical dilemmas, stakeholder stakes, legal ramifications, and optimal multi-option decisions.',
      'Uphold constitutional morality and civil service values (Nolan Principles).',
    ],
    instructionsHi: [
      'नैतिक द्वंद्व, हितधारकों के हित, विधिक सीमाएं एवं बहु-विकल्पीय समाधानों का मूल्यांकन करें।',
      'संवैधानिक नैतिकता एवं लोक सेवा मूल्यों (नोलन सिद्धांत) का अनुपालन दर्शाएं।',
    ],
    questions: [
      {
        id: 'q_gs4_1',
        questionNumber: 1,
        titleEn:
          'Case Study: You are the District Magistrate of an aspirational tribal district. A premier private manufacturing plant promises ₹2,000 Cr investment and local jobs. However, the proposed land encompasses sacred tribal groves (Devasthan) and protected Gram Sabha forest land under the Forest Rights Act (FRA 2006). The local MLA and business lobby pressure you to bypass Gram Sabha consent, citing national development interest. \n\n(a) Identify the ethical dilemmas involved.\n(b) Critically evaluate the available options.\n(c) Propose your course of action with justifiable grounds.',
        titleHi:
          'केस स्टडी: आप एक आकांक्षी जनजातीय जिले के जिला कलेक्टर हैं। एक प्रमुख निजी औद्योगिक संयंत्र ₹2,000 करोड़ के निवेश और स्थानीय नौकरियों का प्रस्ताव देता है। किंतु प्रस्तावित भूमि वन अधिकार अधिनियम (FRA 2006) के तहत संरक्षित देवस्थान (पवित्र उपवन) एवं ग्राम सभा की वन भूमि में आती है। स्थानीय विधायक और कॉर्पोरेट लॉबी राष्ट्रीय विकास के हित का हवाला देकर ग्राम सभा की सहमति को दरकिनार करने का दबाव बना रहे हैं।\n\n(क) इसमें निहित नैतिक दुविधाओं को पहचानिए।\n(ख) उपलब्ध विकल्पों का आलोचनात्मक मूल्यांकन कीजिए।\n(ग) उचित आधारों के साथ अपनी कार्ययोजना प्रस्तुत कीजिए।',
        marks: 20,
        wordLimit: 300,
        topicsCovered: ['Case Study', 'Tribal Rights', 'Conflict of Interest', 'Civil Service Values'],
        difficulty: 'HARD',
        modelAnswerEn:
          '(a) Ethical Dilemmas:\n1. Economic Development vs Tribal Cultural Heritage and Environmental Conservation.\n2. Rule of Law & Statutory Compliance (FRA 2006) vs Political Pressure and Expediency.\n3. Short-term Job Promises vs Long-term Displacement and Loss of Ecological Sustenance.\n\n(b) Evaluation of Options:\n- Option 1: Yielding to political pressure and bypassing Gram Sabha consent.\n  Critique: Illegal, breaches FRA 2006 and constitutional trust; provokes mass tribal unrest.\n- Option 2: Outrightly rejecting the project and losing the investment.\n  Critique: Impairs industrial growth and deprives unemployed youth of viable livelihood avenues.\n- Option 3: Protecting sacred groves through boundary realignment, securing voluntary Gram Sabha consultation, and integrating community CSR benefits.\n  Critique: Balances development with constitutional rights and environmental sanctity.\n\n(c) Proposed Course of Action:\n1. Strict adherence to law: Refuse to bypass Gram Sabha; FRA 2006 consent is non-negotiable.\n2. Technical re-survey: Direct Revenue and Forest teams to carve out sacred groves and re-align plant boundaries to non-cultivable wasteland.\n3. Transparent Consultation: Convene special Gram Sabha with tribal elders, ensuring guaranteed local youth technical skill training and project employment quotas.\n4. Corporate commitment: Legally bind the company to invest 5% CSR in local healthcare, education, and eco-restoration.',
        modelAnswerHi:
          '(क) निहित नैतिक दुविधाएं:\n1. आर्थिक विकास बनाम जनजातीय सांस्कृतिक पहचान एवं पर्यावरण संरक्षण।\n2. विधि का शासन (FRA 2006) बनाम राजनीतिक दबाव एवं सुविधावादी निर्णय।\n3. त्वरित औद्योगिक लाभ बनाम पारंपरिक वनवासियों का विस्थापन।\n\n(ख) विकल्पों का मूल्यांकन:\n- विकल्प 1: राजनीतिक दबाव में आकर ग्राम सभा की उपेक्षा करना (अनुचित, गैर-कानूनी एवं जनाक्रोश उत्पन्न करने वाला)।\n- विकल्प 2: परियोजना को सिरे से खारिज करना (जिले के औद्योगिक विकास एवं युवाओं के रोजगार का नुकसान)।\n- विकल्प 3: देवस्थान को पूर्णतः सुरक्षित रखते हुए परियोजना भूमि का पुनर्संरेखण (री-अलाइनमेंट) एवं ग्राम सभा के साथ पारदर्शी संवाद।\n\n(ग) प्रस्तावित कार्ययोजना:\n1. विधि की सर्वोच्चता: वन अधिकार अधिनियम 2006 के तहत ग्राम सभा सहमति अनिवार्य है; किसी भी दबाव में अवैध कदम नहीं उठाऊंगा।\n2. तकनीकी सर्वे: राजस्व एवं वन विभाग को पवित्र उपवनों को सुरक्षित रखते हुए प्लांट हेतु वैकल्पिक बंजर भूमि चिह्नित करने का निर्देश।\n3. ग्राम सभा से सीधा संवाद: जनजातीय प्रतिनिधियों को विश्वास में लेकर स्थानीय युवाओं हेतु तकनीकी प्रशिक्षण व नौकरियों की वैधानिक गारंटी।\n4. सीएसआर प्रतिबद्धता: कंपनी से स्थानीय स्वास्थ्य, शिक्षा एवं पर्यावरण पुनरुद्धार हेतु बाध्यकारी अनुबंध।',
        evaluationRubric: [
          { criterionEn: 'Identification of ethical dilemmas and stakeholders', criterionHi: 'नैतिक दुविधाओं एवं सभी हितधारकों की पहचान', maxMarks: 5 },
          { criterionEn: 'Critical evaluation of options (legality, morality, feasibility)', criterionHi: 'विकल्पों का निष्पक्ष मूल्यांकन (विधिकता, नैतिकता, व्यावहारिकता)', maxMarks: 7 },
          { criterionEn: 'Balanced, lawful, and empathetic action plan', criterionHi: 'संतुलित, विधिक एवं संवेदनशील अंतिम कार्ययोजना', maxMarks: 8 },
        ],
        keyPointsEn: [
          'Forest Rights Act 2006 non-negotiable consent',
          'Sacred groves (Devasthan) cultural preservation',
          'Alternative boundary realignment without hurting ecology',
          'CSR skill training and constitutional probity',
        ],
        keyPointsHi: [
          'वन अधिकार अधिनियम 2006 की अनिवार्य सहमति',
          'पवित्र देवस्थान एवं सांस्कृतिक विरासत का संरक्षण',
          'परियोजना हेतु वैकल्पिक बंजर भूमि का पुनर्संरेखण',
          'स्थानीय युवाओं हेतु रोजगार गारंटी एवं शुचिता',
        ],
      },
    ],
  },

  // ==========================================
  // 3. EXAM-SPECIFIC DESCRIPTIVE OPTIONS
  // ==========================================
  {
    id: 'subj_banking_desc_01',
    code: 'BANK-DESC-01',
    titleEn: 'Banking Descriptive English & Financial Case Studies',
    titleHi: 'बैंकिंग विवरणात्मक अंग्रेजी एवं वित्तीय केस स्टडीज',
    branchCategory: 'EXAM_SPECIFIC',
    branchNameEn: 'Banking & Financial Descriptive',
    branchNameHi: 'बैंकिंग एवं वित्तीय विवरणात्मक',
    subTopics: ['Banking Regulatory Letters (RBI, Ombudsman)', 'Financial Sector Essay Writing', 'Credit Appraisal Case Study'],
    subTopicsHi: ['बैंकिंग नियामक पत्र (आरबीआई, लोकपाल)', 'वित्तीय क्षेत्र निबंध लेखन', 'क्रेडिट मूल्यांकन केस स्टडी'],
    examTarget: 'IBPS PO / SBI PO / RBI Grade B / NABARD',
    durationMinutes: 45,
    totalMarks: 50,
    questionsCount: 2,
    isFree: true,
    attemptsCount: 9200,
    instructionsEn: [
      'Type responses into the test console. Word counter indicates real-time progress.',
      'Address the prompt using standard commercial banking terminology and RBI regulatory frameworks.',
    ],
    instructionsHi: [
      'परीक्षण कंसोल में उत्तर टाइप करें। शब्द काउंटर वास्तविक समय में प्रगति दर्शाता है।',
      'मानक वाणिज्यिक बैंकिंग शब्दावली एवं आरबीआई विनियामक ढांचे का प्रयोग करें।',
    ],
    questions: [
      {
        id: 'q_bank_letter',
        questionNumber: 1,
        titleEn:
          'Write a formal letter to the Banking Ombudsman (RBI) reporting persistent unauthorized fraudulent electronic transactions from your savings account despite prompt complaint lodging with the branch manager. (150 words)',
        titleHi:
          'शाखा प्रबंधक को त्वरित शिकायत दर्ज कराने के बावजूद आपके बचत खाते से अनधिकृत इलेक्ट्रॉनिक धोखाधड़ी के लेनदेन के संबंध में बैंकिंग लोकपाल (RBI) को औपचारिक पत्र लिखिए। (150 शब्द)',
        marks: 20,
        wordLimit: 150,
        topicsCovered: ['Banking Ombudsman Scheme', 'Customer Protection RBI Circular'],
        difficulty: 'MODERATE',
        modelAnswerEn:
          'To,\nThe Banking Ombudsman,\nReserve Bank of India,\nBhopal Regional Office.\n\nDate: 08 September 2026\n\nSubject: Complaint regarding unauthorized digital debit of ₹65,000 and bank’s failure to reverse funds.\n\nRespected Sir/Madam,\n\nI hold Savings Account No. 98765432101 with National Commercial Bank, MP Nagar Branch. On 28 August 2026, four unauthorized UPI transactions totaling ₹65,000 were debited without OTP generation or sharing. \n\nIn accordance with RBI Circular on "Customer Protection – Limiting Liability in Unauthorized Electronic Banking Transactions", I reported the cyber fraud within 2 hours to the Branch Manager and customer care (Complaint Ref: CR-8921). However, even after 10 days, the bank has failed to credit the shadow balance or furnish the forensic transaction log.\n\nI request your urgent intervention to direct the bank to reimburse the entire disputed sum of ₹65,000 along with accrued interest.\n\nYours faithfully,\n\nAarav Sharma\nMob: 9876543210',
        modelAnswerHi:
          'सेवा में,\nबैंकिंग लोकपाल,\nभारतीय रिजर्व बैंक,\nभोपाल।\n\nदिनांक: 08 सितम्बर 2026\n\nविषय: खाते से ₹65,000 के अनधिकृत लेनदेन तथा बैंक द्वारा राशि वापस न किए जाने बाबत।\n\nमहोदय,\n\nमेरा बचत खाता संख्या 98765432101 राष्ट्रीय वाणिज्यिक बैंक, एमपी नगर शाखा में है। दिनांक 28 अगस्त 2026 को मेरे खाते से बिना किसी ओटीपी साझा किए ₹65,000 के चार अनधिकृत यूपीआई लेनदेन हुए।\n\nआरबीआई के "अनधिकृत इलेक्ट्रॉनिक लेनदेन में ग्राहक की सीमित देयता" परिपत्र के अनुसार मैंने घटना के 2 घंटे के भीतर शाखा प्रबंधक को लिखित सूचना (शिकायत क्रमांक: CR-8921) दी। किंतु 10 दिन बीत जाने पर भी बैंक ने राशि वापस नहीं की।\n\nअतः आपसे करबद्ध निवेदन है कि बैंक को विवादित राशि ₹65,000 ब्याज सहित वापस करने का निर्देश जारी करने की कृपा करें।\n\nभवदीय,\n\nआरव शर्मा\nमो: 9876543210',
        evaluationRubric: [
          { criterionEn: 'Correct format of Banking Ombudsman letter', criterionHi: 'बैंकिंग लोकपाल पत्र का मानक प्रारूप', maxMarks: 6 },
          { criterionEn: 'Citation of RBI zero-liability circular guidelines', criterionHi: 'आरबीआई शून्य-देयता परिपत्र का उचित संदर्भ', maxMarks: 8 },
          { criterionEn: 'Concise statement of transaction details and relief sought', criterionHi: 'लेनदेन विवरण एवं मांगी गई राहत की स्पष्टता', maxMarks: 6 },
        ],
        keyPointsEn: [
          'Reference to RBI Circular on Limiting Customer Liability',
          'Timeline proof of reporting within 2 hours',
          'Account number, dispute amount, and branch details',
          'Clear prayer for restitution of funds',
        ],
        keyPointsHi: [
          'आरबीआई ग्राहक देयता परिपत्र का संदर्भ',
          '2 घंटे के भीतर बैंक को सूचना देने का प्रमाण',
          'खाता संख्या, विवादित राशि व शाखा का उल्लेख',
          'राशि की त्वरित प्रतिपूर्ति की स्पष्ट मांग',
        ],
      },
    ],
  },
  {
    id: 'subj_ssc_tier3_01',
    code: 'SSC-TIER3-01',
    titleEn: 'SSC Tier-3 Descriptive Test (Essay & Letter Drafting)',
    titleHi: 'एसएससी टियर-3 विवरणात्मक परीक्षा (निबंध एवं पत्र प्रारूपण)',
    branchCategory: 'EXAM_SPECIFIC',
    branchNameEn: 'SSC Descriptive Exam',
    branchNameHi: 'एसएससी विवरणात्मक परीक्षा',
    subTopics: ['Socio-Economic Essays (250 Words)', 'Application / Official Letter Writing (150 Words)'],
    subTopicsHi: ['सामाजिक-आर्थिक निबंध (250 शब्द)', 'आवेदन / शासकीय पत्र लेखन (150 शब्द)'],
    examTarget: 'SSC CGL / SSC CHSL / MTS',
    durationMinutes: 60,
    totalMarks: 100,
    questionsCount: 2,
    isFree: true,
    attemptsCount: 8890,
    instructionsEn: [
      'Do not mention personal names, roll numbers, or personal addresses in the answer script to avoid UFM (Unfair Means).',
      'Strict adherence to word count (+/- 10%).',
    ],
    instructionsHi: [
      'यूएफएम (UFM) से बचने हेतु उत्तर पुस्तिका में वास्तविक नाम, रोल नंबर अथवा व्यक्तिगत पते का उल्लेख न करें।',
      'शब्द सीमा (+/- 10%) का कड़ाई से पालन करें।',
    ],
    questions: [
      {
        id: 'q_ssc_essay',
        questionNumber: 1,
        titleEn:
          'Write an essay on: "Role of Make in India and Production Linked Incentive (PLI) Schemes in Modernizing Indian Manufacturing" in about 250 words.',
        titleHi:
          'लगभग 250 शब्दों में निबंध लिखिए: "भारतीय विनिर्माण के आधुनिकीकरण में मेक इन इंडिया एवं उत्पादन से जुड़े प्रोत्साहन (PLI) योजनाओं की भूमिका"।',
        marks: 50,
        wordLimit: 250,
        topicsCovered: ['Make in India', 'PLI Scheme', 'Industrial Growth'],
        difficulty: 'MODERATE',
        modelAnswerEn:
          'The flagship "Make in India" initiative, reinforced by the Production Linked Incentive (PLI) scheme across 14 strategic sectors, has catalyzed a paradigm shift in Indian industrial manufacturing. By incentivizing domestic output and attracting global supply chain champions, India is transitioning from a service-dominant economy into a high-technology global manufacturing hub.\n\nThe PLI framework has delivered spectacular dividends, particularly in electronics, mobile manufacturing, automotive components, and pharmaceuticals. India has become the world’s second-largest mobile phone manufacturer, with giants like Apple and Samsung anchoring extensive component ecosystems. Furthermore, self-reliance in API (Active Pharmaceutical Ingredients) and defense production has bolstered strategic sovereignty.\n\nHowever, bottlenecks remain. Low domestic R&D expenditure (below 0.7% of GDP), high logistics overheads (around 13-14% of GDP), complex land-labor regulations, and import dependence on semiconductor wafers challenge sustained competitiveness.\n\nTo build resilient manufacturing, India must integrate PM Gati Shakti for logistical efficiency, invest aggressively in semiconductor foundries through the India Semiconductor Mission, and upskill the industrial workforce. PLI provides the takeoff momentum; long-term regulatory ease will secure global leadership.',
        modelAnswerHi:
          '"मेक इन इंडिया" पहल और 14 प्रमुख क्षेत्रों में लागू उत्पादन से जुड़ी प्रोत्साहन (PLI) योजना ने भारतीय विनिर्माण परिदृश्य में ऐतिहासिक परिवर्तन किया है। घरेलू उत्पादन को प्रोत्साहित कर भारत स्वयं को एक वैश्विक विनिर्माण केंद्र के रूप में स्थापित कर रहा है।\n\nइलेक्ट्रॉनिक्स, मोबाइल फोन, ऑटोमोबाइल और फार्मास्यूटिकल क्षेत्रों में पीएलआई योजना के परिणाम अभूतपूर्व रहे हैं। भारत विश्व का दूसरा सबसे बड़ा मोबाइल उत्पादक बन चुका है। रक्षा उत्पादन एवं सक्रिय दवा सामग्री (API) में आत्मनिर्भरता से राष्ट्रीय संप्रभुता सशक्त हुई है।\n\nकिंतु कुछ चुनौतियां अब भी विद्यमान हैं। जीडीपी के 0.7% से कम अनुसंधान एवं विकास (R&D) व्यय, उच्च लॉजिस्टिक्स लागत (13-14%), तथा सेमीकंडक्टर चिप्स हेतु विदेशी निर्भरता मुख्य बाधाएं हैं।\n\nनिष्कर्षतः, पीएम गति शक्ति द्वारा लॉजिस्टिक्स सुधार, सेमीकंडक्टर मिशन का तीव्र क्रियान्वयन एवं कार्यबल का कौशल उन्नयन भारत को वैश्विक विनिर्माण महाशक्ति बनाने की दिशा में निर्णायक कदम सिद्ध होंगे।',
        evaluationRubric: [
          { criterionEn: 'Analysis of Make in India & 14 PLI sectors impact', criterionHi: 'मेक इन इंडिया एवं 14 पीएलआई क्षेत्रों का प्रभाव विश्लेषण', maxMarks: 18 },
          { criterionEn: 'Critical evaluation of bottlenecks (R&D, logistics)', criterionHi: 'बाधाओं (अनुसंधान, लॉजिस्टिक्स लागत) की वस्तुनिष्ठ समीक्षा', maxMarks: 18 },
          { criterionEn: 'Linguistic flow, vocabulary, and forward roadmap', criterionHi: 'भाषाई प्रवाह, शब्दावली एवं सुसंगत समापन', maxMarks: 14 },
        ],
        keyPointsEn: [
          '14 key sectors under PLI scheme',
          'Mobile electronics export boom',
          'Logistics cost challenges & PM Gati Shakti',
          'R&D expenditure and semiconductor independence',
        ],
        keyPointsHi: [
          'पीएलआई योजना के अंतर्गत 14 प्रमुख क्षेत्र',
          'मोबाइल इलेक्ट्रॉनिक्स निर्यात में उछाल',
          'लॉजिस्टिक्स लागत की चुनौती व पीएम गति शक्ति',
          'अनुसंधान व्यय एवं सेमीकंडक्टर आत्मनिर्भरता',
        ],
      },
    ],
  },
  {
    id: 'subj_mppsc_mains_01',
    code: 'MPPSC-MAINS-01',
    titleEn: 'MPPSC Mains GS Papers (1 to 4) & Hindi Language Drafting',
    titleHi: 'एमपीपीएससी मुख्य परीक्षा सामान्य अध्ययन (1 से 4) एवं हिंदी प्रारूपण',
    branchCategory: 'EXAM_SPECIFIC',
    branchNameEn: 'MPPSC Mains Complete Papers',
    branchNameHi: 'एमपीपीएससी मुख्य परीक्षा समग्र प्रश्नपत्र',
    subTopics: ['MP Historical Dynasties (Bundela, Holkar, Scindia)', 'Narmada Valley Topography & Water Resources', 'MP Panchayat & Administrative Reforms', 'Hindi Drafting & Translation'],
    subTopicsHi: ['म.प्र. के ऐतिहासिक राजवंश (बुंदेला, होल्कर, सिंधिया)', 'नर्मदा घाटी स्थलाकृति एवं जल संसाधन', 'म.प्र. पंचायती राज एवं प्रशासनिक सुधार', 'हिंदी प्रारूपण एवं अनुवाद'],
    examTarget: 'MPPSC State Services Mains Exam',
    durationMinutes: 180,
    totalMarks: 300,
    questionsCount: 6,
    isFree: true,
    attemptsCount: 7950,
    instructionsEn: [
      'Write answers according to MPPSC new pattern (3 marks, 5 marks, 11 marks).',
      'Incorporate Madhya Pradesh specific administrative data, tribal culture references, and geography landmarks.',
    ],
    instructionsHi: [
      'एमपीपीएससी नवीन परीक्षा योजना (3 अंक, 5 अंक, 11 अंक) के अनुसार उत्तर लिखें।',
      'मध्य प्रदेश के विशेष प्रशासनिक आंकड़े, जनजातीय संस्कृति एवं भौगोलिक संदर्भ अवश्य सम्मिलित करें।',
    ],
    questions: [
      {
        id: 'q_mppsc_1',
        questionNumber: 1,
        titleEn:
          'Evaluate the contribution of Devi Ahilyabai Holkar to public administration, women empowerment, and religious architecture in Malwa and across India. (11 Marks / 200 Words)',
        titleHi:
          'मालवा एवं संपूर्ण भारत में लोक प्रशासन, महिला सशक्तिकरण एवं धार्मिक स्थापत्य के क्षेत्र में लोकमाता देवी अहिल्याबाई होल्कर के योगदान का मूल्यांकन कीजिए। (11 अंक / 200 शब्द)',
        marks: 11,
        wordLimit: 200,
        topicsCovered: ['MPPSC Mains GS-1', 'Holkar Dynasty', 'Ahilyabai Administrative Reforms'],
        difficulty: 'MODERATE',
        modelAnswerEn:
          'Devi Ahilyabai Holkar (1725–1795), revered as Lokmata, ruled the Holkar state of Indore from her capital Maheshwar for nearly three decades with exceptional statesmanship.\n\n1. Public Administration & Justice: She established direct public hearings (Praja Darbar), eliminated bureaucratic bribery, lowered agricultural taxes, and instituted equitable dispute resolution without caste or religious prejudice.\n2. Women Empowerment & Social Upliftment: A pioneer of social reform, she patronized the world-famous Maheshwari handloom sari industry, ensuring financial independence for widows and artisan women. She formed a dedicated women battalion for defense and banned female infanticide.\n3. Pan-Indian Religious Architecture: Using her personal treasury (Khasgi), she rebuilt iconic temples, Ghats, and pilgrimage inns destroyed during medieval turmoil from Kedarnath and Badrinath in the North, Kashi Vishwanath in Varanasi, to Somnath and Rameshwaram in the South.\n4. Sustainable Infrastructure: Constructed roads, tree-lined highways, step-wells (Baolis), and water tanks across Malwa, exemplifying ethical trustee governance long before modern constitutional concepts.',
        modelAnswerHi:
          'लोकमाता देवी अहिल्याबाई होल्कर (1725–1795) ने लगभग तीन दशकों तक महेश्वर को राजधानी बनाकर मालवा राज्य पर आदर्श धर्मनिष्ठ शासन किया।\n\n1. लोक प्रशासन एवं न्याय व्यवस्था: उन्होंने प्रत्यक्ष प्रजा दरबार की शुरुआत की, भ्रष्टाचार पर कठोर अंकुश लगाया, कृषि करों में रियायत दी तथा निष्पक्ष न्याय की मिसाल कायम की।\n2. महिला सशक्तिकरण: महेश्वरी हथकरघा साड़ी उद्योग की स्थापना कर उन्होंने विधवाओं एवं ग्रामीण महिलाओं को आर्थिक स्वावलंबन प्रदान किया। उन्होंने महिला सुरक्षा हेतु विशेष टुकड़ी का गठन किया।\n3. अखिल भारतीय धार्मिक एवं सांस्कृतिक स्थापत्य: अपनी निजी संपत्ति (खासगी) से उन्होंने उत्तर में केदारनाथ-बद्रीनाथ, काशी विश्वनाथ (वाराणसी), से लेकर सोमनाथ एवं दक्षिण में रामेश्वरम तक सैकड़ों मंदिरों, धर्मशालाओं और गंगा घाटों का जीर्णोद्धार कराया।\n4. लोक-कल्याणकारी अवसंरचना: मालवा में बावड़ियों, सड़कों एवं अन्नक्षेत्रों का निर्माण कराकर उन्होंने गांधीजी के "ट्रस्टीशिप" सिद्धांत को व्यवहार में चरितार्थ किया।',
        evaluationRubric: [
          { criterionEn: 'Administrative and judicial reforms at Maheshwar', criterionHi: 'महेश्वर में प्रशासनिक एवं न्याय व्यवस्था का विवरण', maxMarks: 4 },
          { criterionEn: 'Women empowerment & Maheshwari handloom initiative', criterionHi: 'महिला सशक्तिकरण एवं महेश्वरी हथकरघा उद्योग पहल', maxMarks: 3 },
          { criterionEn: 'Pan-India temple restorations (Kashi Vishwanath, Somnath)', criterionHi: 'अखिल भारतीय मंदिर जीर्णोद्धार (काशी, सोमनाथ, केदारनाथ)', maxMarks: 4 },
        ],
        keyPointsEn: [
          'Capital at Maheshwar on the banks of Narmada',
          'Maheshwari saree loom economic empowerment',
          'Restoration of Kashi Vishwanath and Somnath temples',
          'Concept of welfare state and Trustee governance',
        ],
        keyPointsHi: [
          'नर्मदा तट पर महेश्वर को राजधानी बनाना',
          'महेश्वरी साड़ी उद्योग द्वारा महिलाओं का स्वावलंबन',
          'काशी विश्वनाथ एवं सोमनाथ मंदिरों का ऐतिहासिक पुनर्निर्माण',
          'प्रजा-कल्याणकारी न्यासिता (ट्रस्टीशिप) शासन',
        ],
      },
    ],
  },
  {
    id: 'subj_police_si_01',
    code: 'POLICE-SI-DESC-01',
    titleEn: 'Police/SI General Hindi Grammar & Legal Awareness Descriptive',
    titleHi: 'पुलिस/सब इंस्पेक्टर सामान्य हिंदी व्याकरण एवं विधिक जागरूकता',
    branchCategory: 'EXAM_SPECIFIC',
    branchNameEn: 'Police & Legal Descriptive',
    branchNameHi: 'पुलिस एवं विधिक विवरणात्मक',
    subTopics: ['भारतीय नागरिक सुरक्षा संहिता (BNSS) विधिक प्रारूपण', 'प्रथम सूचना रिपोर्ट (FIR) लेखन', 'हिंदी मुहावरे, लोकोक्तियां एवं सार संक्षेपण'],
    subTopicsHi: ['भारतीय नागरिक सुरक्षा संहिता (BNSS) विधिक प्रारूपण', 'प्रथम सूचना रिपोर्ट (FIR) लेखन', 'हिंदी मुहावरे, लोकोक्तियां एवं सार संक्षेपण'],
    examTarget: 'MP Police SI / UP Police SI / State Sub-Inspector',
    durationMinutes: 90,
    totalMarks: 100,
    questionsCount: 3,
    isFree: true,
    attemptsCount: 7420,
    instructionsEn: [
      'Write clear, legally compliant FIR narratives adhering to Bharatiya Nagarik Suraksha Sanhita (BNSS) standards.',
      'Maintain exact chronological sequence, witness details, and relevant penal sections.',
    ],
    instructionsHi: [
      'भारतीय नागरिक सुरक्षा संहिता (BNSS) मानकों के अनुसार स्पष्ट एवं विधिक रूप से परिपूर्ण प्राथमिकी (FIR) का प्रारूप लिखें।',
      'घटनाक्रम, गवाहों के विवरण एवं सुसंगत धाराओं का कालक्रमानुसार उल्लेख करें।',
    ],
    questions: [
      {
        id: 'q_police_fir',
        questionNumber: 1,
        titleEn:
          'Draft a model First Information Report (FIR / प्राथमिकी) for an incident of armed jewelry shop robbery involving cyber-masking under Bharatiya Nyaya Sanhita (BNS 2023). (150 Words)',
        titleHi:
          'भारतीय न्याय संहिता (BNS 2023) के अंतर्गत साइबर-मास्किंग युक्त सशस्त्र आभूषण दुकान डकैती की घटना हेतु एक मानक प्रथम सूचना रिपोर्ट (FIR / प्राथमिकी) का प्रारूप तैयार कीजिए। (150 शब्द)',
        marks: 25,
        wordLimit: 150,
        topicsCovered: ['FIR Drafting', 'Police Investigation', 'BNS 2023'],
        difficulty: 'MODERATE',
        modelAnswerEn:
          'Police Station: MP Nagar, District Bhopal\nFIR No: 142/2026 | Date & Time: 08.09.2026 at 16:30 Hrs\nSections: Sections 310(2) (Dacoity with deadly weapon), 309(4) (Robbery), and 66D IT Act (Cyber Masking)\n\nComplainant: Ramesh Soni, Owner, Tanishq Jewellers, Zone-2, MP Nagar\nDate, Time & Place of Occurrence: 08.09.2026 at 14:15 Hrs at complainant’s shop\n\nBrief Facts of Incident:\nToday at approximately 14:15 Hrs, four unidentified masked men armed with country-made pistols entered the showroom. The suspects neutralized the local CCTV cloud-backup using a portable signal jammer. Holding the staff at gunpoint, they looted gold ornaments weighing approx. 1.2 kg and cash worth ₹3.5 Lakhs from the counter safe.\n\nThe assailants fled on two unnumbered motorcycles toward Link Road. Witness statements recorded. CCTV footage retrieved from adjoining bank branch. Case registered and investigation entrusted to Sub-Inspector Vikram Singh.',
        modelAnswerHi:
          'थाना: एमपी नगर, जिला भोपाल (म.प्र.)\nप्राथमिकी क्रमांक: 142/2026 | दिनांक व समय: 08.09.2026 को 16:30 बजे\nधाराएं: भारतीय न्याय संहिता (BNS 2023) की धारा 310(2) (सशस्त्र डकैती), 309(4) एवं 66D सूचना प्रौद्योगिकी अधिनियम\n\nप्रथम सूचनाकर्ता: रमेश सोनी, संचालक, सोनी ज्वेलर्स, जोन-2, एमपी नगर\nघटना स्थल एवं समय: 08.09.2026 को दोपहर 14:15 बजे, ज्वेलरी शोरूम\n\nघटना का संक्षिप्त विवरण:\nआज दोपहर 14:15 बजे चार अज्ञात नकाबपोश व्यक्ति कट्टा व धारदार हथियार लेकर शोरूम में घुसे। उन्होंने सिग्नल जैमर का उपयोग कर सुरक्षा सायरन को बाधित किया तथा कर्मचारियों को बंधक बनाकर लॉकर से लगभग 1.2 किलोग्राम स्वर्ण आभूषण एवं ₹3.5 लाख नकद लूट लिए।\n\nआरोपी बिना नंबर प्लेट की दो बाइकों पर लिंक रोड की ओर भागे। प्रत्यक्षदर्शियों के बयान दर्ज किए गए। निकटवर्ती बैंक के सीसीटीवी फुटेज सुरक्षित कर जांच उप-निरीक्षक विक्रम सिंह को सौंपी गई।',
        evaluationRubric: [
          { criterionEn: 'Standard police FIR layout (police station, date, complainant)', criterionHi: 'प्राथमिकी का मानक विधिक ढांचा (थाना, समय, सूचनाकर्ता)', maxMarks: 7 },
          { criterionEn: 'Application of relevant BNS & IT Act sections', criterionHi: 'भारतीय न्याय संहिता (BNS) एवं आईटी एक्ट की सुसंगत धाराएं', maxMarks: 10 },
          { criterionEn: 'Chronological lucidity and investigative handover note', criterionHi: 'कालानुक्रमिक स्पष्टता एवं विवेचना सुपुर्दगी टिप्पणी', maxMarks: 8 },
        ],
        keyPointsEn: [
          'FIR metadata: PS, date, time, sections',
          'BNS 2023 dacoity sections and IT Act jammer misuse',
          'Chronological summary of armed intrusion and loot value',
          'Signature, witness list, and IO assignment',
        ],
        keyPointsHi: [
          'प्राथमिकी मेटाडेटा: थाना, समय, दिनांक, धाराएं',
          'BNS 2023 की डकैती धाराएं एवं साइबर जैमर का उल्लेख',
          'सशस्त्र घुसपैठ एवं लूटी गई संपत्ति का विवरण',
          'विवेचना अधिकारी की नियुक्ति एवं विधिक औपचारिकता',
        ],
      },
    ],
  },
  {
    id: 'subj_railways_tech_01',
    code: 'RRB-TECH-DESC-01',
    titleEn: 'Railways Technical Trade & Analytical Writing',
    titleHi: 'रेलवे तकनीकी ट्रेड एवं विश्लेषणात्मक लेखन',
    branchCategory: 'EXAM_SPECIFIC',
    branchNameEn: 'Railways Technical & Trade',
    branchNameHi: 'रेलवे तकनीकी एवं ट्रेड',
    subTopics: ['Kavach (Automatic Train Protection) System', 'Vande Bharat Bogie & Traction Dynamics', 'Signaling & Interlocking Safety Protocols'],
    subTopicsHi: ['कवच (ऑटोमैटिक ट्रेन प्रोटेक्शन) प्रणाली', 'वंदे भारत बोगी एवं कर्षण गतिकी', 'सिग्नलिंग एवं इंटरलॉकिंग सुरक्षा प्रोटोकॉल'],
    examTarget: 'RRB SSE / RRB JE / Loco Pilot Technical',
    durationMinutes: 90,
    totalMarks: 100,
    questionsCount: 3,
    isFree: true,
    attemptsCount: 6890,
    instructionsEn: [
      'Explain railway engineering mechanisms with block diagrams, RFID transceiver protocols, and brake application curves.',
      'Cite RDSO (Research Designs & Standards Organisation) technical benchmarks.',
    ],
    instructionsHi: [
      'ब्लॉक आरेख, आरएफआईडी ट्रांससीवर प्रोटोकॉल एवं ब्रेक अनुप्रयोग वक्र के साथ रेलवे इंजीनियरिंग की कार्यप्रणाली स्पष्ट करें।',
      'आरडीएसओ (RDSO) तकनीकी मानकों का संदर्भ अवश्य दें।',
    ],
    questions: [
      {
        id: 'q_rrb_kavach',
        questionNumber: 1,
        titleEn:
          'Explain the working architecture of the "Kavach" Indigenous Automatic Train Protection (ATP) system. Describe how it prevents Signal Passed at Danger (SPAD) and head-on collisions.',
        titleHi:
          'स्वदेशी स्वचालित ट्रेन सुरक्षा (ATP) प्रणाली "कवच" की कार्यप्रणाली संरचना स्पष्ट कीजिए। यह खतरे के सिग्नल को पार करने (SPAD) तथा आमने-सामने की टक्कर को कैसे रोकती है?',
        marks: 20,
        wordLimit: 300,
        topicsCovered: ['Railways Signalling', 'Kavach ATP Architecture', 'Safety Engineering'],
        difficulty: 'MODERATE',
        modelAnswerEn:
          '1. Kavach Architecture: Developed by RDSO, Kavach is a Safety Integrity Level 4 (SIL-4) certified Automatic Train Protection system comprising:\n- Trackside Equipment: RFID tags fitted on track sleepers every 1 km to identify locomotive coordinates.\n- Locomotive Equipment: On-board Loco Kavach computer, driver-machine interface (DMI), and auto-brake actuators.\n- Station & Tower Equipment: Station Kavach interfaced with electronic interlocking, transmitting wireless UHF (Ultra High Frequency) radio packets.\n\n2. Prevention of SPAD: If a train approaches a red signal at excessive speed and the Loco Pilot fails to acknowledge or brake, Kavach computes the dynamic braking curve. If the driver misses the alert, Kavach automatically actuates service/emergency pneumatic brakes, bringing the train to a halt before the signal.\n\n3. Head-On & Rear Collision Elimination: Station Kavach continuously compares the GPS/RFID locations of all trains within its block section. If two trains are detected on the same track heading toward each other, auto-broadcast SOS signals trigger automatic emergency braking simultaneously in both locomotives, preventing collision even in zero-visibility foggy weather.',
        modelAnswerHi:
          '1. कवच की संरचना: आरडीएसओ (RDSO) द्वारा विकसित यह SIL-4 प्रमाणित सुरक्षा प्रणाली है, जिसके तीन मुख्य घटक हैं:\n- ट्रैकसाइड उपकरण: प्रत्येक 1 किमी पर ट्रैक स्लीपरों पर लगे आरएफआईडी (RFID) टैग जो ट्रेन की सटीक स्थिति बताते हैं।\n- लोको उपकरण: इंजन में लगा लोको कवच कंप्यूटर, ड्राइवर डिस्प्ले तथा स्वचालित न्यूमैटिक ब्रेक एक्चुएटर।\n- स्टेशन एवं टावर यूनिट: स्टेशन कवच जो इलेक्ट्रॉनिक इंटरलॉकिंग से जुड़ा होता है और यूएचएफ (UHF) रेडियो तरंगों से संचार करता है।\n\n2. SPAD (खतरे के सिग्नल पार करने) की रोकथाम: जब ट्रेन लाल सिग्नल के समीप पहुंचती है और चालक गति कम नहीं करता, तो कवच डायनामिक ब्रेकिंग कर्व की गणना करता है। चेतावनी की उपेक्षा पर कवच स्वतः आपातकालीन ब्रेक लगाकर ट्रेन को सिग्नल से पूर्व रोक देता है।\n3. आमने-सामने की टक्कर से बचाव: स्टेशन कवच ट्रैक पर संचालित ट्रेनों की स्थिति की निरंतर निगरानी करता है। यदि एक ही ट्रैक पर दो ट्रेनें आमने-सामने आती हैं, तो रेडियो सिग्नल द्वारा दोनों ट्रेनों में तत्काल स्वतः ब्रेक लग जाते हैं, जिससे कोहरे में भी दुर्घटना रुकती है।',
        evaluationRubric: [
          { criterionEn: 'Kavach hardware components (RFID, Loco unit, Station tower)', criterionHi: 'कवच के हार्डवेयर घटक (आरएफआईडी, लोको यूनिट, स्टेशन टावर)', maxMarks: 6 },
          { criterionEn: 'SPAD dynamic braking curve intervention mechanism', criterionHi: 'एसपीएडी (SPAD) पर स्वतः ब्रेक लगाने की कार्यप्रणाली', maxMarks: 7 },
          { criterionEn: 'Collision prevention logic via continuous radio signaling', criterionHi: 'रेडियो सिग्नलों द्वारा आमने-सामने की टक्कर रोकने का सिद्धांत', maxMarks: 7 },
        ],
        keyPointsEn: [
          'SIL-4 certified indigenous RDSO system',
          'RFID track tags and UHF radio communication',
          'Automatic brake application upon SPAD risk',
          'Real-time SOS broadcasting for head-on collision avoidance',
        ],
        keyPointsHi: [
          'आरडीएसओ द्वारा SIL-4 प्रमाणित स्वदेशी प्रणाली',
          'आरएफआईडी ट्रैक टैग एवं यूएचएफ रेडियो संचार',
          'खतरे के सिग्नल पर स्वतः ब्रेक अनुप्रयोग',
          'आमने-सामने की टक्कर रोकने हेतु स्वचालित एसओएस संदेश',
        ],
      },
    ],
  },
];
