// Curated DMLT 2nd Year Medical Terminology & Pronunciation Lexicon

export interface MedicalTerm {
  id: string;
  term: string;
  phonetic: string; // Phonetic spelling breakdown
  syllables?: string; // Syllable division
  definition: string;
  category: 'Immunohematology' | 'Histotechnology' | 'Cytology' | 'Bacteriology' | 'Mycology' | 'Parasitology' | 'Virology' | 'Clinical Biochemistry' | 'Diagnostic Staining' | 'General Pathology';
  chapterId?: string; // Optional direct mapping to chapter
  clinicalRelevance?: string;
}

export const DMLT_MEDICAL_GLOSSARY: MedicalTerm[] = [
  // =========================================================================
  // PATHOLOGY: Immunohematology & Blood Banking
  // =========================================================================
  {
    id: 'term_immunohematology',
    term: 'Immunohematology',
    phonetic: 'im-YOO-noh-HEE-muh-TOL-uh-jee',
    syllables: 'im-mu-no-hem-a-tol-o-gy',
    definition: 'Branch of medical laboratory science focusing on antigen-antibody reactions in blood and transfusion safety.',
    category: 'Immunohematology',
    chapterId: 'path_ch1',
    clinicalRelevance: 'Core foundation for blood group genetics and cross-matching.'
  },
  {
    id: 'term_fucosyltransferase',
    term: 'Fucosyltransferase',
    phonetic: 'FYOO-koh-sil-TRANS-fer-ayz',
    syllables: 'fu-co-syl-trans-fer-ase',
    definition: 'Enzyme encoded by FUT1 (H gene) that transfers L-fucose onto RBC precursor chains to produce H antigen.',
    category: 'Immunohematology',
    chapterId: 'path_ch1',
    clinicalRelevance: 'Absence produces the rare Bombay blood group (Oh phenotype).'
  },
  {
    id: 'term_bombay_phenotype',
    term: 'Bombay Phenotype (Oh)',
    phonetic: 'BOM-bay FEE-noh-type',
    syllables: 'Bom-bay phe-no-type',
    definition: 'Rare genetic condition (genotype hh) lacking H substance on RBCs; contains potent Anti-H antibodies.',
    category: 'Immunohematology',
    chapterId: 'path_ch1',
    clinicalRelevance: 'Can only receive blood from another Bombay individual.'
  },
  {
    id: 'term_secretor_status',
    term: 'Secretor Status',
    phonetic: 'see-KREE-ter STAY-tus',
    syllables: 'se-cre-tor sta-tus',
    definition: 'Inherited FUT2 gene trait determining secretion of soluble ABH blood group substances in saliva and body fluids.',
    category: 'Immunohematology',
    chapterId: 'path_ch1',
    clinicalRelevance: 'Helps resolve ABO blood grouping discrepancies and forensic typing.'
  },
  {
    id: 'term_antigenicity',
    term: 'Antigenicity',
    phonetic: 'an-tih-jeh-NIS-ih-tee',
    syllables: 'an-ti-ge-ni-ci-ty',
    definition: 'The chemical capacity of a substance to specifically bind to pre-formed antibodies or immune receptors.',
    category: 'Immunohematology',
    chapterId: 'path_ch2',
    clinicalRelevance: 'Contrasted with immunogenicity (ability to provoke immune response).'
  },
  {
    id: 'term_immunoglobulin',
    term: 'Immunoglobulin',
    phonetic: 'im-YOO-noh-GLOB-yoo-lin',
    syllables: 'im-mu-no-glob-u-lin',
    definition: 'Glycoprotein molecule produced by plasma cells that acts as an antibody (IgG, IgM, IgA, IgD, IgE).',
    category: 'Immunohematology',
    chapterId: 'path_ch2',
    clinicalRelevance: 'IgM acts as cold complete agglutinin; IgG acts as warm incomplete agglutinin.'
  },
  {
    id: 'term_agglutination',
    term: 'Agglutination',
    phonetic: 'uh-GLOO-tih-NAY-shun',
    syllables: 'ag-glu-ti-na-tion',
    definition: 'Clumping of red cells or insoluble particles when surface antigens cross-link with multivalent antibodies.',
    category: 'Immunohematology',
    chapterId: 'path_ch2',
    clinicalRelevance: 'Visible endpoint for ABO grouping and Coombs direct/indirect tests.'
  },
  {
    id: 'term_dolichos_biflorus',
    term: 'Dolichos biflorus',
    phonetic: 'DOH-lih-kohs bye-FLOR-us',
    syllables: 'Do-li-chos bi-flo-rus',
    definition: 'Anti-A1 specific botanical seed lectin used to distinguish subgroup A1 from A2.',
    category: 'Immunohematology',
    chapterId: 'path_ch3',
    clinicalRelevance: 'Agglutinates A1 and A1B cells; negative on A2 and A2B cells.'
  },
  {
    id: 'term_isohemagglutinin',
    term: 'Isohemagglutinin',
    phonetic: 'EYE-soh-hee-muh-GLOO-tih-nin',
    syllables: 'i-so-he-mag-glu-ti-nin',
    definition: 'Naturally occurring antibody (mainly IgM) directed against foreign ABO blood group antigens.',
    category: 'Immunohematology',
    chapterId: 'path_ch3',
    clinicalRelevance: 'Causes severe acute hemolytic transfusion reactions if ABO mismatched.'
  },
  {
    id: 'term_erythroblastosis',
    term: 'Erythroblastosis Fetalis',
    phonetic: 'er-ITH-roh-blas-TOH-sis fee-TAL-iss',
    syllables: 'e-ry-thro-blas-to-sis fe-ta-lis',
    definition: 'Severe hemolytic disease of newborn caused by maternal IgG anti-D crossing placenta to destroy fetal Rh+ RBCs.',
    category: 'Immunohematology',
    chapterId: 'path_ch4',
    clinicalRelevance: 'Prevented by postpartum anti-D immunoglobulin (RhoGAM) injection.'
  },
  {
    id: 'term_antiglobulin',
    term: 'Antiglobulin (Coombs Reagent)',
    phonetic: 'AN-tee-GLOB-yoo-lin',
    syllables: 'an-ti-glob-u-lin',
    definition: 'Rabbit or monoclonal antibody directed against human globulin (IgG/C3d) to bridge sensitized red cells.',
    category: 'Immunohematology',
    chapterId: 'path_ch5',
    clinicalRelevance: 'Essential for Direct (DAT) and Indirect (IAT) Coombs tests.'
  },
  {
    id: 'term_cryoprecipitate',
    term: 'Cryoprecipitate',
    phonetic: 'KRY-oh-pruh-SIP-ih-tayt',
    syllables: 'cry-o-pre-ci-pi-tate',
    definition: 'Cold-insoluble fraction of fresh frozen plasma rich in Factor VIII, von Willebrand factor, and fibrinogen.',
    category: 'Immunohematology',
    chapterId: 'path_ch6',
    clinicalRelevance: 'Transfused to manage hemophilia A, vWD, and hypofibrinogenemia.'
  },
  {
    id: 'term_leukoreduction',
    term: 'Leukoreduction',
    phonetic: 'LOO-koh-ree-DUK-shun',
    syllables: 'leu-ko-re-duc-tion',
    definition: 'Process of filtering white blood cells from donor blood products to reduce febrile reactions and CMV transmission.',
    category: 'Immunohematology',
    chapterId: 'path_ch6',
    clinicalRelevance: 'Prevents HLA alloimmunization in chronically transfused patients.'
  },
  {
    id: 'term_plasmapheresis',
    term: 'Plasmapheresis',
    phonetic: 'PLAZ-muh-fuh-REE-sis',
    syllables: 'plas-ma-phe-re-sis',
    definition: 'Apheresis procedure where whole blood is removed, plasma separated, and cellular components returned to donor.',
    category: 'Immunohematology',
    chapterId: 'path_ch7',
    clinicalRelevance: 'Used for donor collection of hyperimmune plasma and therapeutic exchange.'
  },
  {
    id: 'term_apheresis',
    term: 'Apheresis',
    phonetic: 'AF-uh-REE-sis',
    syllables: 'a-phe-re-sis',
    definition: 'Automated technique separating donor blood into individual components (platelets, granulocytes, plasma).',
    category: 'Immunohematology',
    chapterId: 'path_ch7',
    clinicalRelevance: 'Provides single-donor platelets equivalent to 4-6 pooled random units.'
  },

  // =========================================================================
  // PATHOLOGY: Histotechnology & Cytology
  // =========================================================================
  {
    id: 'term_histotechnology',
    term: 'Histotechnology',
    phonetic: 'HIS-toh-tek-NOL-uh-jee',
    syllables: 'his-to-tech-nol-o-gy',
    definition: 'Art and science of preparing biopsy tissue specimens into microscopic thin sections for pathological diagnosis.',
    category: 'Histotechnology',
    chapterId: 'path_ch8',
    clinicalRelevance: 'Essential diagnostic step for cancer detection and tissue analysis.'
  },
  {
    id: 'term_formalin',
    term: 'Formalin Fixative',
    phonetic: 'FOR-muh-lin FIK-suh-tiv',
    syllables: 'for-ma-lin fix-a-tive',
    definition: '10% neutral buffered formalin (3.7-4.0% formaldehyde) cross-linking protein amino groups to prevent autolysis.',
    category: 'Histotechnology',
    chapterId: 'path_ch9',
    clinicalRelevance: 'Gold-standard routine fixative with 15-20:1 fixative-to-tissue volume ratio.'
  },
  {
    id: 'term_decalcification',
    term: 'Decalcification',
    phonetic: 'dee-KAL-sih-fih-KAY-shun',
    syllables: 'de-cal-ci-fi-ca-tion',
    definition: 'Removal of calcium ions from bone and calcified tissues using dilute acids or chelating agents (EDTA).',
    category: 'Histotechnology',
    chapterId: 'path_ch9',
    clinicalRelevance: 'Allows cutting thin sections on a microtome without tearing or nicking blades.'
  },
  {
    id: 'term_microtome',
    term: 'Microtome',
    phonetic: 'MY-kruh-tohm',
    syllables: 'mi-cro-tome',
    definition: 'Precision mechanical cutting instrument used to cut tissue blocks into sections 3 to 5 micrometers thick.',
    category: 'Histotechnology',
    chapterId: 'path_ch10',
    clinicalRelevance: 'Rotary microtome is standard for paraffin blocks; freezing microtome for cryosections.'
  },
  {
    id: 'term_hematoxylin',
    term: 'Hematoxylin',
    phonetic: 'HEE-muh-TOK-suh-lin',
    syllables: 'he-ma-tox-y-lin',
    definition: 'Basic natural dye oxidized to hematein, complexed with aluminum mordant to stain cell nuclei blue-purple.',
    category: 'Diagnostic Staining',
    chapterId: 'path_ch11',
    clinicalRelevance: 'Principal nuclear stain in routine H&E (Harris, Mayer, Ehrlich formulas).'
  },
  {
    id: 'term_eosin',
    term: 'Eosin',
    phonetic: 'EE-oh-sin',
    syllables: 'e-o-sin',
    definition: 'Acidic xanthene counterstain that imparts pink-red coloration to cytoplasm, collagen, and RBCs.',
    category: 'Diagnostic Staining',
    chapterId: 'path_ch11',
    clinicalRelevance: 'Provides contrasting cytoplasmic differentiation in H&E.'
  },
  {
    id: 'term_papanicolaou',
    term: 'Papanicolaou (Pap) Stain',
    phonetic: 'PAP-uh-NIK-uh-LOW',
    syllables: 'Pa-pa-ni-co-la-ou',
    definition: 'Multichromatic cytology staining technique using Hematoxylin, OG-6, and EA-50/65 for cervical cancer screening.',
    category: 'Cytology',
    chapterId: 'path_ch12',
    clinicalRelevance: 'Gold standard for early detection of cervical dysplasia and malignancy.'
  },
  {
    id: 'term_cryostat',
    term: 'Cryostat',
    phonetic: 'KRY-oh-stat',
    syllables: 'cry-o-stat',
    definition: 'Refrigerated cabinet housing a microtome maintained between -15°C and -25°C for rapid intraoperative frozen sections.',
    category: 'Histotechnology',
    chapterId: 'path_ch13',
    clinicalRelevance: 'Enables 15-minute intraoperative surgical margin evaluations.'
  },

  // =========================================================================
  // MICROBIOLOGY: Bacteriology, Mycology, Parasitology & Virology
  // =========================================================================
  {
    id: 'term_staphylococcus',
    term: 'Staphylococcus aureus',
    phonetic: 'STAF-ih-loh-KOK-us AW-ree-us',
    syllables: 'Staph-y-lo-coc-cus au-re-us',
    definition: 'Gram-positive spherical bacterium arranged in clusters; catalase-positive and coagulase-positive.',
    category: 'Bacteriology',
    chapterId: 'micro_ch1',
    clinicalRelevance: 'Causes skin abscesses, food poisoning, toxic shock syndrome, and osteomyelitis.'
  },
  {
    id: 'term_coagulase',
    term: 'Coagulase Test',
    phonetic: 'koh-AG-yoo-layz',
    syllables: 'co-ag-u-lase',
    definition: 'Enzymatic test detecting free and bound coagulase converting fibrinogen to fibrin clot.',
    category: 'Bacteriology',
    chapterId: 'micro_ch1',
    clinicalRelevance: 'Definitively differentiates S. aureus (+) from coagulase-negative staphylococci.'
  },
  {
    id: 'term_streptococcus',
    term: 'Streptococcus pyogenes',
    phonetic: 'STREP-toh-KOK-us pie-AH-jen-eez',
    syllables: 'Strep-to-coc-cus py-o-ge-nes',
    definition: 'Group A beta-hemolytic Streptococcus; bacitracin sensitive; causes pharyngitis and rheumatic fever.',
    category: 'Bacteriology',
    chapterId: 'micro_ch1',
    clinicalRelevance: 'Produces streptolysin O/S; tested via ASO titer for post-streptococcal sequelae.'
  },
  {
    id: 'term_mycobacterium',
    term: 'Mycobacterium tuberculosis',
    phonetic: 'MY-koh-bak-TEER-ee-um TOO-bur-kyoo-LOH-sis',
    syllables: 'My-co-bac-te-ri-um tu-ber-cu-lo-sis',
    definition: 'Acid-fast, obligate aerobe, slow-growing bacillus with lipid-rich mycolic acid cell wall.',
    category: 'Bacteriology',
    chapterId: 'micro_ch2',
    clinicalRelevance: 'Identified by Ziehl-Neelsen (ZN) acid-fast stain and Lowenstein-Jensen (LJ) medium.'
  },
  {
    id: 'term_ziehl_neelsen',
    term: 'Ziehl-Neelsen (ZN) Stain',
    phonetic: 'ZEEL NEEL-sen',
    syllables: 'Ziehl-Neel-sen',
    definition: 'Differential acid-fast staining using hot carbol fuchsin, 20% sulfuric acid decolorizer, and methylene blue.',
    category: 'Diagnostic Staining',
    chapterId: 'micro_ch2',
    clinicalRelevance: 'AFB bacilli appear bright red/pink against blue background.'
  },
  {
    id: 'term_treponema',
    term: 'Treponema pallidum',
    phonetic: 'tre-puh-NEE-muh PAL-ih-dum',
    syllables: 'Tre-po-ne-ma pal-li-dum',
    definition: 'Microaerophilic spirochete with corkscrew motility; causative agent of human syphilis.',
    category: 'Bacteriology',
    chapterId: 'micro_ch3',
    clinicalRelevance: 'Diagnosed via dark-field microscopy, VDRL/RPR (non-treponemal) and TPHA/FTA-ABS.'
  },
  {
    id: 'term_macconkey',
    term: 'MacConkey Agar',
    phonetic: 'muh-KONG-kee AH-gar',
    syllables: 'Mac-Con-key a-gar',
    definition: 'Selective and differential culture medium with bile salts and crystal violet inhibiting Gram-positive bacteria.',
    category: 'Bacteriology',
    chapterId: 'micro_ch4',
    clinicalRelevance: 'Distinguishes lactose fermenters (pink colonies) from non-fermenters (pale/colorless).'
  },
  {
    id: 'term_dermatophyte',
    term: 'Dermatophyte',
    phonetic: 'dur-MAT-oh-fyte',
    syllables: 'der-ma-to-phyte',
    definition: 'Keratinophilic filamentous fungi (Trichophyton, Microsporum, Epidermophyton) causing ringworm/tinea.',
    category: 'Mycology',
    chapterId: 'micro_ch5',
    clinicalRelevance: 'Direct examination via 10-20% potassium hydroxide (KOH) wet mount.'
  },
  {
    id: 'term_candida',
    term: 'Candida albicans',
    phonetic: 'KAN-dih-duh AL-bih-kanz',
    syllables: 'Can-di-da al-bi-cans',
    definition: 'Dimorphic opportunistic yeast forming budding yeast cells, pseudohyphae, and germ tubes in human serum.',
    category: 'Mycology',
    chapterId: 'micro_ch5',
    clinicalRelevance: 'Positive 2-3 hour germ tube test confirms identity.'
  },
  {
    id: 'term_plasmodium',
    term: 'Plasmodium falciparum',
    phonetic: 'plaz-MOH-dee-um fal-SIP-uh-rum',
    syllables: 'Plas-mo-di-um fal-ci-pa-rum',
    definition: 'Most lethal malaria protozoan; causes malignant tertian malaria, microvascular sequestration, and blackwater fever.',
    category: 'Parasitology',
    chapterId: 'micro_ch6',
    clinicalRelevance: 'Demonstrates ring forms and crescent-shaped banana gametocytes on Giemsa stain.'
  },
  {
    id: 'term_giardia',
    term: 'Giardia lamblia',
    phonetic: 'jee-AHR-dee-uh LAM-blee-uh',
    syllables: 'Giar-di-a lam-bli-a',
    definition: 'Flagellated protozoan causing waterborne traveler diarrhea and malabsorption; has falling-leaf motility.',
    category: 'Parasitology',
    chapterId: 'micro_ch6',
    clinicalRelevance: 'Trophozoite has characteristic two nuclei resembling spectacles / smiling face.'
  },
  {
    id: 'term_hepatitis_b',
    term: 'HBsAg (Hepatitis B Surface Antigen)',
    phonetic: 'H B S an-tih-jen',
    syllables: 'H-B-S an-ti-gen',
    definition: 'First serological marker appearing in serum during acute HBV infection, indicating current infectivity.',
    category: 'Virology',
    chapterId: 'micro_ch7',
    clinicalRelevance: 'Persistence beyond 6 months indicates chronic carrier state.'
  },

  // =========================================================================
  // BIOCHEMISTRY: Clinical Chemistry & Enzymology
  // =========================================================================
  {
    id: 'term_spectrophotometry',
    term: 'Spectrophotometry',
    phonetic: 'SPEK-troh-foh-TOM-uh-tree',
    syllables: 'spec-tro-pho-tom-e-try',
    definition: 'Quantitative measurement of light absorption or transmission through a solution as a function of wavelength.',
    category: 'Clinical Biochemistry',
    chapterId: 'biochem_ch1',
    clinicalRelevance: 'Operates on Beer-Lambert Law: Absorbance is directly proportional to concentration.'
  },
  {
    id: 'term_beer_lambert',
    term: 'Beer-Lambert Law',
    phonetic: 'BEER LAM-bert Law',
    syllables: 'Beer-Lam-bert',
    definition: 'Physical law stating A = ε·c·l (Absorbance equals molar absorptivity × concentration × path length).',
    category: 'Clinical Biochemistry',
    chapterId: 'biochem_ch1',
    clinicalRelevance: 'Mathematical premise for clinical chemistry photometric calculations.'
  },
  {
    id: 'term_god_pod',
    term: 'GOD-POD Enzymatic Method',
    phonetic: 'G O D P O D Method',
    syllables: 'G-O-D P-O-D',
    definition: 'Glucose Oxidase - Peroxidase enzymatic coupled colorimetric assay generating quinoneimine dye.',
    category: 'Clinical Biochemistry',
    chapterId: 'biochem_ch2',
    clinicalRelevance: 'Specific gold-standard enzymatic test for plasma fasting and postprandial glucose.'
  },
  {
    id: 'term_glycosylated_hemoglobin',
    term: 'Glycosylated Hemoglobin (HbA1c)',
    phonetic: 'GLY-koh-sil-ay-ted HEE-muh-GLOB-in',
    syllables: 'gly-co-sy-la-ted he-mo-glo-bin',
    definition: 'Hemoglobin non-enzymatically conjugated with glucose; reflects average plasma glucose over past 90-120 days.',
    category: 'Clinical Biochemistry',
    chapterId: 'biochem_ch2',
    clinicalRelevance: 'Normal: <5.7%; Prediabetes: 5.7-6.4%; Diabetes: ≥6.5%.'
  },
  {
    id: 'term_biuret_method',
    term: 'Biuret Method',
    phonetic: 'bye-YOO-ret Method',
    syllables: 'bi-u-ret',
    definition: 'Alkaline cupric sulfate reagent reacting with peptide bonds (≥2) to yield violet chelate complex measured at 540nm.',
    category: 'Clinical Biochemistry',
    chapterId: 'biochem_ch3',
    clinicalRelevance: 'Standard quantitative assay for serum total protein (normal: 6.0 - 8.3 g/dL).'
  },
  {
    id: 'term_bromocresol_green',
    term: 'Bromocresol Green (BCG)',
    phonetic: 'BROH-moh-KREE-sawl Green',
    syllables: 'bro-mo-cre-sol green',
    definition: 'Anionic indicator dye binding specifically to serum albumin at pH 4.2 to yield green-blue chromogen at 628nm.',
    category: 'Clinical Biochemistry',
    chapterId: 'biochem_ch3',
    clinicalRelevance: 'Routine dye-binding method for albumin (normal: 3.5 - 5.0 g/dL).'
  },
  {
    id: 'term_jaffe_reaction',
    term: 'Jaffe Reaction (Alkaline Picrate)',
    phonetic: 'JAF-ee Ree-AK-shun',
    syllables: 'Jaf-fe re-ac-tion',
    definition: 'Colorimetric test where creatinine reacts with alkaline picrate to form yellow-orange creatinine picrate at 520nm.',
    category: 'Clinical Biochemistry',
    chapterId: 'biochem_ch4',
    clinicalRelevance: 'Standard assay for serum and urine creatinine in renal function panels.'
  },
  {
    id: 'term_transaminase',
    term: 'Transaminase (AST/ALT)',
    phonetic: 'trans-AM-ih-nayz',
    syllables: 'trans-am-i-nase',
    definition: 'Intracellular enzymes transferring amino groups; AST (SGOT) and ALT (SGPT) indicate hepatocyte injury.',
    category: 'Clinical Biochemistry',
    chapterId: 'biochem_ch5',
    clinicalRelevance: 'Markedly elevated (>1000 IU/L) in acute viral or toxic hepatitis; ALT is liver specific.'
  },
  {
    id: 'term_alkaline_phosphatase',
    term: 'Alkaline Phosphatase (ALP)',
    phonetic: 'AL-kuh-lyn FOS-fuh-tayz',
    syllables: 'al-ka-line phos-pha-tase',
    definition: 'Zinc metalloenzyme hydrolyzing monophosphate esters at alkaline pH (9-10); originates from biliary tract and bone.',
    category: 'Clinical Biochemistry',
    chapterId: 'biochem_ch5',
    clinicalRelevance: 'Strikingly elevated in obstructive biliary jaundice and osteoblastic bone diseases.'
  },
  {
    id: 'term_bilirubin_van_den_bergh',
    term: 'Van den Bergh Reaction',
    phonetic: 'VAN den BURG Ree-AK-shun',
    syllables: 'Van den Bergh',
    definition: 'Diazotized sulfanilic acid reacting with conjugated bilirubin (direct/prompt) or unconjugated with methanol (indirect).',
    category: 'Clinical Biochemistry',
    chapterId: 'biochem_ch5',
    clinicalRelevance: 'Differentiates hemolytic (pre-hepatic), hepatocellular, and obstructive jaundice.'
  },
  {
    id: 'term_electrophoresis',
    term: 'Serum Protein Electrophoresis (SPEP)',
    phonetic: 'ee-LEK-troh-fuh-REE-sis',
    syllables: 'e-lec-tro-pho-re-sis',
    definition: 'Separation of serum proteins in electric field into Albumin, Alpha-1, Alpha-2, Beta, and Gamma globulin zones.',
    category: 'Clinical Biochemistry',
    chapterId: 'biochem_ch6',
    clinicalRelevance: 'Essential for detecting monoclonal M-spike in multiple myeloma.'
  },
  {
    id: 'term_westgard_rules',
    term: 'Westgard Multirules',
    phonetic: 'WEST-gard Rules',
    syllables: 'West-gard',
    definition: 'Statistical quality control rules (1:2s, 1:3s, 2:2s, R:4s, 4:1s, 10:x) evaluating Levey-Jennings QC charts.',
    category: 'Clinical Biochemistry',
    chapterId: 'biochem_ch7',
    clinicalRelevance: 'Standard for laboratory internal quality control, detecting random and systematic error.'
  }
];

// Helper to retrieve medical terms matching a specific chapter
export function getChapterMedicalTerms(chapterId: string): MedicalTerm[] {
  return DMLT_MEDICAL_GLOSSARY.filter((t) => t.chapterId === chapterId);
}

// Helper to extract medical terms mentioned in a topic title or text
export function extractMedicalTermsFromText(text: string, chapterId?: string): MedicalTerm[] {
  if (!text) return [];

  const lowerText = text.toLowerCase();
  const matchedTerms: MedicalTerm[] = [];

  // Prioritize chapter-specific terms first, then general glossary
  const pool = [...DMLT_MEDICAL_GLOSSARY].sort((a, b) => {
    if (a.chapterId === chapterId && b.chapterId !== chapterId) return -1;
    if (b.chapterId === chapterId && a.chapterId !== chapterId) return 1;
    return b.term.length - a.term.length; // match longer terms first
  });

  for (const item of pool) {
    // Check root term or main keyword
    const mainWord = item.term.split(' ')[0].toLowerCase().replace(/[()]/g, '');
    const fullTermLower = item.term.toLowerCase();

    // Direct match of full term or primary distinctive keyword
    if (lowerText.includes(fullTermLower) || (mainWord.length > 5 && lowerText.includes(mainWord))) {
      if (!matchedTerms.some((m) => m.id === item.id)) {
        matchedTerms.push(item);
      }
    }
  }

  return matchedTerms;
}
