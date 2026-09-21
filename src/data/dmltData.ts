import { Paper } from '../types';

export const DMLT_PAPERS: Paper[] = [
  {
    id: 'pathology',
    paperCode: 'PAPER I',
    title: 'PATHOLOGY',
    description: 'Immunohematology, Blood Banking, Histotechnology & Cytology Techniques',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    chapters: [
      {
        id: 'path_ch1',
        chapterNumber: 1,
        title: 'Introduction to Immunohematology',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch1_t1', chapterId: 'path_ch1', paperId: 'pathology', title: 'Define immunohematology. State its importance.' },
          { id: 'path_ch1_t2', chapterId: 'path_ch1', paperId: 'pathology', title: 'Write the historical overview of immunohematology.' },
          { id: 'path_ch1_t3', chapterId: 'path_ch1', paperId: 'pathology', title: 'Explain blood-group genetics.' },
          { id: 'path_ch1_t4', chapterId: 'path_ch1', paperId: 'pathology', title: 'Explain the role of the H gene in expression of ABO genes.' },
          { id: 'path_ch1_t5', chapterId: 'path_ch1', paperId: 'pathology', title: 'Define secretor and non-secretor. Differentiate them.' },
          { id: 'path_ch1_t6', chapterId: 'path_ch1', paperId: 'pathology', title: 'Explain the relationship between H antigen and ABO antigens.' },
          { id: 'path_ch1_t7', chapterId: 'path_ch1', paperId: 'pathology', title: 'Short facts: H gene, H antigen, secretor status, inheritance of blood groups.' }
        ]
      },
      {
        id: 'path_ch2',
        chapterNumber: 2,
        title: 'Principles of Antigens and Antibodies',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch2_t1', chapterId: 'path_ch2', paperId: 'pathology', title: 'Define antigen and antibody.' },
          { id: 'path_ch2_t2', chapterId: 'path_ch2', paperId: 'pathology', title: 'Write the properties of antigens.' },
          { id: 'path_ch2_t3', chapterId: 'path_ch2', paperId: 'pathology', title: 'Classify/describe antibodies.' },
          { id: 'path_ch2_t4', chapterId: 'path_ch2', paperId: 'pathology', title: 'Explain antigen-antibody reaction.' },
          { id: 'path_ch2_t5', chapterId: 'path_ch2', paperId: 'pathology', title: 'Write the important features of immunoglobulins relevant to blood banking.' },
          { id: 'path_ch2_t6', chapterId: 'path_ch2', paperId: 'pathology', title: 'Differentiate antigen and antibody.' }
        ]
      },
      {
        id: 'path_ch3',
        chapterNumber: 3,
        title: 'ABO Blood Group System',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch3_t1', chapterId: 'path_ch3', paperId: 'pathology', title: 'Write the discovery/history of the ABO system.' },
          { id: 'path_ch3_t2', chapterId: 'path_ch3', paperId: 'pathology', title: 'Explain inheritance of ABO groups.' },
          { id: 'path_ch3_t3', chapterId: 'path_ch3', paperId: 'pathology', title: 'Describe A, B, AB and O blood groups and their antibodies.' },
          { id: 'path_ch3_t4', chapterId: 'path_ch3', paperId: 'pathology', title: 'Write the types of antisera used in ABO grouping.' },
          { id: 'path_ch3_t5', chapterId: 'path_ch3', paperId: 'pathology', title: 'Explain manifestations and interpretation of antigen-antibody reactions.' },
          { id: 'path_ch3_t6', chapterId: 'path_ch3', paperId: 'pathology', title: 'Explain preparation of 5% RBC cell-wash suspension.' },
          { id: 'path_ch3_t7', chapterId: 'path_ch3', paperId: 'pathology', title: 'Describe forward grouping and reverse grouping.' },
          { id: 'path_ch3_t8', chapterId: 'path_ch3', paperId: 'pathology', title: 'Write the principle, procedure and interpretation of slide method.' },
          { id: 'path_ch3_t9', chapterId: 'path_ch3', paperId: 'pathology', title: 'Write the principle, procedure and interpretation of tube method.' },
          { id: 'path_ch3_t10', chapterId: 'path_ch3', paperId: 'pathology', title: 'Write the principle and procedure of gel-card method.' },
          { id: 'path_ch3_t11', chapterId: 'path_ch3', paperId: 'pathology', title: 'Write the principle and procedure of microplate method.' },
          { id: 'path_ch3_t12', chapterId: 'path_ch3', paperId: 'pathology', title: 'Differentiate forward and reverse grouping.' }
        ]
      },
      {
        id: 'path_ch4',
        chapterNumber: 4,
        title: 'Rh Blood Group System',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch4_t1', chapterId: 'path_ch4', paperId: 'pathology', title: 'Write the historical background of Rh blood grouping.' },
          { id: 'path_ch4_t2', chapterId: 'path_ch4', paperId: 'pathology', title: 'Explain Rh nomenclature and genetic theories.' },
          { id: 'path_ch4_t3', chapterId: 'path_ch4', paperId: 'pathology', title: 'Name important Rh antigens.' },
          { id: 'path_ch4_t4', chapterId: 'path_ch4', paperId: 'pathology', title: 'Write the variants of Rh antigen.' },
          { id: 'path_ch4_t5', chapterId: 'path_ch4', paperId: 'pathology', title: 'Write a note on Rh antibodies.' },
          { id: 'path_ch4_t6', chapterId: 'path_ch4', paperId: 'pathology', title: 'Explain the Rh(D) grouping technique.' },
          { id: 'path_ch4_t7', chapterId: 'path_ch4', paperId: 'pathology', title: 'Differentiate ABO and Rh blood-group systems.' }
        ]
      },
      {
        id: 'path_ch5',
        chapterNumber: 5,
        title: "Antiglobulin / Coomb's Test",
        paperId: 'pathology',
        topics: [
          { id: 'path_ch5_t1', chapterId: 'path_ch5', paperId: 'pathology', title: 'Define antiglobulin test.' },
          { id: 'path_ch5_t2', chapterId: 'path_ch5', paperId: 'pathology', title: 'Explain the principle, procedure and interpretation of Direct Antiglobulin Test (DAT).' },
          { id: 'path_ch5_t3', chapterId: 'path_ch5', paperId: 'pathology', title: 'Explain the principle, procedure and interpretation of Indirect Antiglobulin Test (IAT).' },
          { id: 'path_ch5_t4', chapterId: 'path_ch5', paperId: 'pathology', title: 'Differentiate DAT and IAT and write common applications.' }
        ]
      },
      {
        id: 'path_ch6',
        chapterNumber: 6,
        title: 'Cross-Matching / Compatibility Testing',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch6_t1', chapterId: 'path_ch6', paperId: 'pathology', title: 'Define cross-match and state its purpose.' },
          { id: 'path_ch6_t2', chapterId: 'path_ch6', paperId: 'pathology', title: 'Write the types of cross-match.' },
          { id: 'path_ch6_t3', chapterId: 'path_ch6', paperId: 'pathology', title: 'Explain selection of blood for cross-match.' },
          { id: 'path_ch6_t4', chapterId: 'path_ch6', paperId: 'pathology', title: 'Describe the procedure of cross-match.' },
          { id: 'path_ch6_t5', chapterId: 'path_ch6', paperId: 'pathology', title: 'Explain saline method.' },
          { id: 'path_ch6_t6', chapterId: 'path_ch6', paperId: 'pathology', title: 'Explain protein/AHG method.' },
          { id: 'path_ch6_t7', chapterId: 'path_ch6', paperId: 'pathology', title: 'Explain enzyme method.' },
          { id: 'path_ch6_t8', chapterId: 'path_ch6', paperId: 'pathology', title: 'Differentiate major and minor cross-match.' },
          { id: 'path_ch6_t9', chapterId: 'path_ch6', paperId: 'pathology', title: 'Write important precautions in compatibility testing.' }
        ]
      },
      {
        id: 'path_ch7',
        chapterNumber: 7,
        title: 'Transfusion Reactions',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch7_t1', chapterId: 'path_ch7', paperId: 'pathology', title: 'Define transfusion reaction.' },
          { id: 'path_ch7_t2', chapterId: 'path_ch7', paperId: 'pathology', title: 'Classify transfusion reactions.' },
          { id: 'path_ch7_t3', chapterId: 'path_ch7', paperId: 'pathology', title: 'Write common causes of transfusion reactions.' },
          { id: 'path_ch7_t4', chapterId: 'path_ch7', paperId: 'pathology', title: 'Describe investigation of a suspected transfusion reaction.' },
          { id: 'path_ch7_t5', chapterId: 'path_ch7', paperId: 'pathology', title: 'List samples to be collected during investigation.' },
          { id: 'path_ch7_t6', chapterId: 'path_ch7', paperId: 'pathology', title: 'Write laboratory steps used in investigation of transfusion reaction.' },
          { id: 'path_ch7_t7', chapterId: 'path_ch7', paperId: 'pathology', title: 'Differentiate acute and delayed transfusion reactions.' }
        ]
      },
      {
        id: 'path_ch8',
        chapterNumber: 8,
        title: 'Blood Banking Techniques',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch8_t1', chapterId: 'path_ch8', paperId: 'pathology', title: 'Write donor-selection criteria.' },
          { id: 'path_ch8_t2', chapterId: 'path_ch8', paperId: 'pathology', title: 'Explain donor screening.' },
          { id: 'path_ch8_t3', chapterId: 'path_ch8', paperId: 'pathology', title: 'Write prerequisites for blood collection.' },
          { id: 'path_ch8_t4', chapterId: 'path_ch8', paperId: 'pathology', title: 'Describe venipuncture procedure for blood collection.' },
          { id: 'path_ch8_t5', chapterId: 'path_ch8', paperId: 'pathology', title: 'List anticoagulants used in blood banking.' },
          { id: 'path_ch8_t6', chapterId: 'path_ch8', paperId: 'pathology', title: 'Define blood component.' },
          { id: 'path_ch8_t7', chapterId: 'path_ch8', paperId: 'pathology', title: 'List major blood components.' },
          { id: 'path_ch8_t8', chapterId: 'path_ch8', paperId: 'pathology', title: 'Write advantages of component therapy.' },
          { id: 'path_ch8_t9', chapterId: 'path_ch8', paperId: 'pathology', title: 'Explain preparation, storage and uses of blood components.' },
          { id: 'path_ch8_t10', chapterId: 'path_ch8', paperId: 'pathology', title: 'Write important precautions during blood collection and storage.' }
        ]
      },
      {
        id: 'path_ch9',
        chapterNumber: 9,
        title: 'Basic Quality Assurance in Blood Banking',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch9_t1', chapterId: 'path_ch9', paperId: 'pathology', title: 'Define quality assurance in blood banking.' },
          { id: 'path_ch9_t2', chapterId: 'path_ch9', paperId: 'pathology', title: 'Write the objectives of quality assurance.' },
          { id: 'path_ch9_t3', chapterId: 'path_ch9', paperId: 'pathology', title: 'List important areas requiring quality control in a blood bank.' },
          { id: 'path_ch9_t4', chapterId: 'path_ch9', paperId: 'pathology', title: 'Write common sources of error in blood banking and their prevention.' },
          { id: 'path_ch9_t5', chapterId: 'path_ch9', paperId: 'pathology', title: 'Write short notes on documentation and traceability.' }
        ]
      },
      {
        id: 'path_ch10',
        chapterNumber: 10,
        title: 'Fixation of Histology Samples',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch10_t1', chapterId: 'path_ch10', paperId: 'pathology', title: 'Define fixation and state its aims.' },
          { id: 'path_ch10_t2', chapterId: 'path_ch10', paperId: 'pathology', title: 'Write the properties of an ideal fixative.' },
          { id: 'path_ch10_t3', chapterId: 'path_ch10', paperId: 'pathology', title: 'Describe tissue changes during fixation.' },
          { id: 'path_ch10_t4', chapterId: 'path_ch10', paperId: 'pathology', title: 'Classify fixatives.' },
          { id: 'path_ch10_t5', chapterId: 'path_ch10', paperId: 'pathology', title: 'Explain the mechanism of fixation and factors affecting fixation.' },
          { id: 'path_ch10_t6', chapterId: 'path_ch10', paperId: 'pathology', title: 'Write precautions for fixation and explain formaldehyde/formalin.' },
          { id: 'path_ch10_t7', chapterId: 'path_ch10', paperId: 'pathology', title: 'Write notes on glutaraldehyde, osmium tetroxide, methyl/ethyl alcohol and acetone.' },
          { id: 'path_ch10_t8', chapterId: 'path_ch10', paperId: 'pathology', title: "Write notes on Bouin's, Zenker's, Helly's and B5 fixatives and fixation artefacts." }
        ]
      },
      {
        id: 'path_ch11',
        chapterNumber: 11,
        title: 'Tissue Processing',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch11_t1', chapterId: 'path_ch11', paperId: 'pathology', title: 'Define tissue processing and list factors influencing it.' },
          { id: 'path_ch11_t2', chapterId: 'path_ch11', paperId: 'pathology', title: 'Explain dehydration and dehydrating agents.' },
          { id: 'path_ch11_t3', chapterId: 'path_ch11', paperId: 'pathology', title: 'Explain clearing and clearing agents (Xylene, Toluene, Chloroform).' },
          { id: 'path_ch11_t4', chapterId: 'path_ch11', paperId: 'pathology', title: 'Explain infiltration and embedding media (Paraffin wax).' },
          { id: 'path_ch11_t5', chapterId: 'path_ch11', paperId: 'pathology', title: 'Describe methods of tissue processing.' },
          { id: 'path_ch11_t6', chapterId: 'path_ch11', paperId: 'pathology', title: 'Write precautions of tissue processing.' },
          { id: 'path_ch11_t7', chapterId: 'path_ch11', paperId: 'pathology', title: 'Write the steps of overnight automatic tissue processing.' },
          { id: 'path_ch11_t8', chapterId: 'path_ch11', paperId: 'pathology', title: 'Write a note on manual tissue processor.' },
          { id: 'path_ch11_t9', chapterId: 'path_ch11', paperId: 'pathology', title: 'Write a note on microwave tissue processing.' },
          { id: 'path_ch11_t10', chapterId: 'path_ch11', paperId: 'pathology', title: 'Troubleshooting and processing artefacts.' }
        ]
      },
      {
        id: 'path_ch12',
        chapterNumber: 12,
        title: 'Embedding of Tissue',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch12_t1', chapterId: 'path_ch12', paperId: 'pathology', title: 'Define embedding and list embedding media.' },
          { id: 'path_ch12_t2', chapterId: 'path_ch12', paperId: 'pathology', title: 'Name different moulds used for tissue blocks (Leuckhart, peel-away, cassette).' },
          { id: 'path_ch12_t3', chapterId: 'path_ch12', paperId: 'pathology', title: 'Describe tissue embedding procedure.' },
          { id: 'path_ch12_t4', chapterId: 'path_ch12', paperId: 'pathology', title: 'Explain tissue orientation during embedding (tubular, skin, cyst wall).' },
          { id: 'path_ch12_t5', chapterId: 'path_ch12', paperId: 'pathology', title: 'Write the importance of tissue marking and labelling.' },
          { id: 'path_ch12_t6', chapterId: 'path_ch12', paperId: 'pathology', title: 'Cooling of blocks and common embedding errors.' }
        ]
      },
      {
        id: 'path_ch13',
        chapterNumber: 13,
        title: 'Decalcification',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch13_t1', chapterId: 'path_ch13', paperId: 'pathology', title: 'Define decalcification and factors controlling its rate.' },
          { id: 'path_ch13_t2', chapterId: 'path_ch13', paperId: 'pathology', title: 'Describe methods of decalcification (acid, chelating, ion exchange, electrical).' },
          { id: 'path_ch13_t3', chapterId: 'path_ch13', paperId: 'pathology', title: 'Write a note on chelating agents (EDTA).' },
          { id: 'path_ch13_t4', chapterId: 'path_ch13', paperId: 'pathology', title: 'Explain surface decalcification.' },
          { id: 'path_ch13_t5', chapterId: 'path_ch13', paperId: 'pathology', title: 'Describe end-point determination of decalcification (chemical, radiographic, physical).' },
          { id: 'path_ch13_t6', chapterId: 'path_ch13', paperId: 'pathology', title: 'Write precautions during decalcification.' },
          { id: 'path_ch13_t7', chapterId: 'path_ch13', paperId: 'pathology', title: 'Washing and neutralization post-decalcification.' }
        ]
      },
      {
        id: 'path_ch14',
        chapterNumber: 14,
        title: 'Tissue Microtomy',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch14_t1', chapterId: 'path_ch14', paperId: 'pathology', title: 'Define microtomy and name different types of microtomes.' },
          { id: 'path_ch14_t2', chapterId: 'path_ch14', paperId: 'pathology', title: 'Describe microtome knife profiles and disposable blades.' },
          { id: 'path_ch14_t3', chapterId: 'path_ch14', paperId: 'pathology', title: 'Explain knife sharpening: honing and stropping.' },
          { id: 'path_ch14_t4', chapterId: 'path_ch14', paperId: 'pathology', title: 'Explain knife angles (clearance angle, rake angle, wedge angle).' },
          { id: 'path_ch14_t5', chapterId: 'path_ch14', paperId: 'pathology', title: 'Describe manual knife sharpening and automatic sharpeners.' },
          { id: 'path_ch14_t6', chapterId: 'path_ch14', paperId: 'pathology', title: 'List factors involved in good section cutting.' },
          { id: 'path_ch14_t7', chapterId: 'path_ch14', paperId: 'pathology', title: 'Write steps of tissue sectioning and floating water bath.' },
          { id: 'path_ch14_t8', chapterId: 'path_ch14', paperId: 'pathology', title: 'List common causes of poor sections and their correction (chatter, scoring, folding).' },
          { id: 'path_ch14_t9', chapterId: 'path_ch14', paperId: 'pathology', title: 'Slide adhesives (egg albumin, poly-L-lysine, gelatin).' }
        ]
      },
      {
        id: 'path_ch15',
        chapterNumber: 15,
        title: 'Frozen Section',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch15_t1', chapterId: 'path_ch15', paperId: 'pathology', title: 'Define frozen section and write indications.' },
          { id: 'path_ch15_t2', chapterId: 'path_ch15', paperId: 'pathology', title: 'Explain the principle of rapid freezing and cryotomy.' },
          { id: 'path_ch15_t3', chapterId: 'path_ch15', paperId: 'pathology', title: 'Describe cryostat instrument and sectioning procedure.' },
          { id: 'path_ch15_t4', chapterId: 'path_ch15', paperId: 'pathology', title: 'Write the steps of rapid H&E staining for frozen section.' },
          { id: 'path_ch15_t5', chapterId: 'path_ch15', paperId: 'pathology', title: 'List factors affecting good-quality frozen sections and freezing artefacts.' },
          { id: 'path_ch15_t6', chapterId: 'path_ch15', paperId: 'pathology', title: 'Applications in enzyme histochemistry and lipid demonstrations.' }
        ]
      },
      {
        id: 'path_ch16',
        chapterNumber: 16,
        title: 'Staining Principles',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch16_t1', chapterId: 'path_ch16', paperId: 'pathology', title: 'Define staining and basic dyes vs acidic dyes.' },
          { id: 'path_ch16_t2', chapterId: 'path_ch16', paperId: 'pathology', title: 'Name dyes used for tissue staining.' },
          { id: 'path_ch16_t3', chapterId: 'path_ch16', paperId: 'pathology', title: 'Classify dyes based on chemical structure.' },
          { id: 'path_ch16_t4', chapterId: 'path_ch16', paperId: 'pathology', title: 'Explain chromophore and auxochrome groups.' },
          { id: 'path_ch16_t5', chapterId: 'path_ch16', paperId: 'pathology', title: 'Explain mechanisms and theories of staining (physical and chemical).' },
          { id: 'path_ch16_t6', chapterId: 'path_ch16', paperId: 'pathology', title: 'Write factors influencing staining.' },
          { id: 'path_ch16_t7', chapterId: 'path_ch16', paperId: 'pathology', title: 'Define metachromasia and metachromatic dyes.' },
          { id: 'path_ch16_t8', chapterId: 'path_ch16', paperId: 'pathology', title: 'Differentiate progressive and regressive staining.' },
          { id: 'path_ch16_t9', chapterId: 'path_ch16', paperId: 'pathology', title: 'Define mordant, accentuator, and lake formation.' },
          { id: 'path_ch16_t10', chapterId: 'path_ch16', paperId: 'pathology', title: 'Write general staining procedure.' },
          { id: 'path_ch16_t11', chapterId: 'path_ch16', paperId: 'pathology', title: 'Explain preparation and use of buffer solutions in histopathology.' }
        ]
      },
      {
        id: 'path_ch17',
        chapterNumber: 17,
        title: 'Haematoxylin and Eosin (H&E)',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch17_t1', chapterId: 'path_ch17', paperId: 'pathology', title: 'Write the properties and role of haematoxylin (Haematein).' },
          { id: 'path_ch17_t2', chapterId: 'path_ch17', paperId: 'pathology', title: 'Explain bluing and bluing solutions (ammonia water, Scott tap water).' },
          { id: 'path_ch17_t3', chapterId: 'path_ch17', paperId: 'pathology', title: "Write preparation/properties of Mayer's haematoxylin." },
          { id: 'path_ch17_t4', chapterId: 'path_ch17', paperId: 'pathology', title: "Write preparation/properties of Ehrlich's haematoxylin." },
          { id: 'path_ch17_t5', chapterId: 'path_ch17', paperId: 'pathology', title: "Write preparation/properties of Cole's and Harris haematoxylin." },
          { id: 'path_ch17_t6', chapterId: 'path_ch17', paperId: 'pathology', title: 'Explain eosin as a counterstain.' },
          { id: 'path_ch17_t7', chapterId: 'path_ch17', paperId: 'pathology', title: 'Describe routine H&E staining procedure step by step.' },
          { id: 'path_ch17_t8', chapterId: 'path_ch17', paperId: 'pathology', title: "Write notes on iron haematoxylins (Weigert's, Heidenhain's)." },
          { id: 'path_ch17_t9', chapterId: 'path_ch17', paperId: 'pathology', title: 'Explain clearing, mounting and coverslipping (DPX).' }
        ]
      },
      {
        id: 'path_ch18',
        chapterNumber: 18,
        title: 'Special Stains',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch18_t1', chapterId: 'path_ch18', paperId: 'pathology', title: 'Write stains for glycogen (Best carmine, PAS).' },
          { id: 'path_ch18_t2', chapterId: 'path_ch18', paperId: 'pathology', title: 'Explain PAS staining principle, procedure and diagnostic use.' },
          { id: 'path_ch18_t3', chapterId: 'path_ch18', paperId: 'pathology', title: 'Write about PAS-Alcian Blue combined staining.' },
          { id: 'path_ch18_t4', chapterId: 'path_ch18', paperId: 'pathology', title: 'Write stains for lipids: Oil Red O and Sudan Black B.' },
          { id: 'path_ch18_t5', chapterId: 'path_ch18', paperId: 'pathology', title: 'Write a note on ferric haematoxylin for phospholipid.' },
          { id: 'path_ch18_t6', chapterId: 'path_ch18', paperId: 'pathology', title: 'Write stains used for proteins, nucleic acids (Feulgen, Methyl green pyronin) and pigments (Perls Prussian blue).' },
          { id: 'path_ch18_t7', chapterId: 'path_ch18', paperId: 'pathology', title: 'Differentiate PAS and Oil Red O.' }
        ]
      },
      {
        id: 'path_ch19',
        chapterNumber: 19,
        title: 'Connective Tissue Stains',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch19_t1', chapterId: 'path_ch19', paperId: 'pathology', title: 'Name stains for collagen fibres.' },
          { id: 'path_ch19_t2', chapterId: 'path_ch19', paperId: 'pathology', title: "Explain Masson's trichrome stain principle and interpretation." },
          { id: 'path_ch19_t3', chapterId: 'path_ch19', paperId: 'pathology', title: 'Explain Van Gieson stain and components.' },
          { id: 'path_ch19_t4', chapterId: 'path_ch19', paperId: 'pathology', title: 'Describe reticulin staining and Gordon & Sweet method.' },
          { id: 'path_ch19_t5', chapterId: 'path_ch19', paperId: 'pathology', title: 'Write stains for elastic fibres.' },
          { id: 'path_ch19_t6', chapterId: 'path_ch19', paperId: 'pathology', title: "Explain Verhoeff's stain." },
          { id: 'path_ch19_t7', chapterId: 'path_ch19', paperId: 'pathology', title: "Write about Weigert's resorcin-fuchsin and orcein." },
          { id: 'path_ch19_t8', chapterId: 'path_ch19', paperId: 'pathology', title: 'Write a note on PTAH (Phosphotungstic Acid Haematoxylin).' },
          { id: 'path_ch19_t9', chapterId: 'path_ch19', paperId: 'pathology', title: 'Explain amyloid staining and apple-green birefringence under polarizing microscopy.' },
          { id: 'path_ch19_t10', chapterId: 'path_ch19', paperId: 'pathology', title: 'Write about Congo Red, Highman Congo Red and Thioflavine T.' }
        ]
      },
      {
        id: 'path_ch20',
        chapterNumber: 20,
        title: 'Stains for Microorganisms',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch20_t1', chapterId: 'path_ch20', paperId: 'pathology', title: 'Write Gram stain in histopathology (Brown-Brenn, Brown-Hopps).' },
          { id: 'path_ch20_t2', chapterId: 'path_ch20', paperId: 'pathology', title: 'Write Ziehl-Neelsen stain for Mycobacterium tuberculosis.' },
          { id: 'path_ch20_t3', chapterId: 'path_ch20', paperId: 'pathology', title: 'Write Fite acid-fast stain for leprosy.' },
          { id: 'path_ch20_t4', chapterId: 'path_ch20', paperId: 'pathology', title: "Write Grocott's methenamine silver (GMS) stain for fungi." },
          { id: 'path_ch20_t5', chapterId: 'path_ch20', paperId: 'pathology', title: 'Write Warthin-Starry technique for spirochetes and H. pylori.' },
          { id: 'path_ch20_t6', chapterId: 'path_ch20', paperId: 'pathology', title: 'Write Phloxine-Tartrazine stain for viral inclusions.' },
          { id: 'path_ch20_t7', chapterId: 'path_ch20', paperId: 'pathology', title: 'Match organism/inclusion with appropriate histopathologic stain.' }
        ]
      },
      {
        id: 'path_ch21',
        chapterNumber: 21,
        title: 'Museum Techniques',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch21_t1', chapterId: 'path_ch21', paperId: 'pathology', title: 'State the importance of museum techniques in pathology.' },
          { id: 'path_ch21_t2', chapterId: 'path_ch21', paperId: 'pathology', title: "Write composition, principle and preparation of Kaiserling's solution (I, II, III)." },
          { id: 'path_ch21_t3', chapterId: 'path_ch21', paperId: 'pathology', title: 'List requirements and jar types for a pathology museum.' },
          { id: 'path_ch21_t4', chapterId: 'path_ch21', paperId: 'pathology', title: 'Describe mounting and sealing of museum specimens (Perspex jars).' },
          { id: 'path_ch21_t5', chapterId: 'path_ch21', paperId: 'pathology', title: 'Write precautions in museum specimen preparation.' }
        ]
      },
      {
        id: 'path_ch22',
        chapterNumber: 22,
        title: 'Autopsy Techniques',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch22_t1', chapterId: 'path_ch22', paperId: 'pathology', title: 'Define autopsy and write clinical vs medicolegal purposes.' },
          { id: 'path_ch22_t2', chapterId: 'path_ch22', paperId: 'pathology', title: 'Write indications and consent requirements for autopsy.' },
          { id: 'path_ch22_t3', chapterId: 'path_ch22', paperId: 'pathology', title: 'Write prerequisites and instruments for autopsy.' },
          { id: 'path_ch22_t4', chapterId: 'path_ch22', paperId: 'pathology', title: 'Describe techniques of organ dissection (Virchow, Ghon, Letulle, Rokitansky).' },
          { id: 'path_ch22_t5', chapterId: 'path_ch22', paperId: 'pathology', title: 'Describe collection, preservation and storage of organs and fluids removed at autopsy.' },
          { id: 'path_ch22_t6', chapterId: 'path_ch22', paperId: 'pathology', title: 'Write biosafety precautions and personal protective equipment in autopsy work.' }
        ]
      },
      {
        id: 'path_ch23',
        chapterNumber: 23,
        title: 'Cytology Sample Procurement & Processing',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch23_t1', chapterId: 'path_ch23', paperId: 'pathology', title: 'Define cytology (exfoliative vs aspiration cytology).' },
          { id: 'path_ch23_t2', chapterId: 'path_ch23', paperId: 'pathology', title: 'Describe cytology sample collection.' },
          { id: 'path_ch23_t3', chapterId: 'path_ch23', paperId: 'pathology', title: 'Explain Fine Needle Aspiration Cytology (FNAC) procedure.' },
          { id: 'path_ch23_t4', chapterId: 'path_ch23', paperId: 'pathology', title: 'Write FNAC of deep-seated lesions.' },
          { id: 'path_ch23_t5', chapterId: 'path_ch23', paperId: 'pathology', title: 'Write USG-guided FNAC.' },
          { id: 'path_ch23_t6', chapterId: 'path_ch23', paperId: 'pathology', title: 'Write CT-guided FNAC.' },
          { id: 'path_ch23_t7', chapterId: 'path_ch23', paperId: 'pathology', title: 'Write EUS-guided FNAC.' },
          { id: 'path_ch23_t8', chapterId: 'path_ch23', paperId: 'pathology', title: 'Write a note on cervical cytology (Pap smear collection, Ayre spatula, cytobrush).' },
          { id: 'path_ch23_t9', chapterId: 'path_ch23', paperId: 'pathology', title: 'List respiratory cytology samples (sputum, bronchial washings, BAL).' },
          { id: 'path_ch23_t10', chapterId: 'path_ch23', paperId: 'pathology', title: 'Explain fixation and special fixatives in cytology (95% ethyl alcohol, ether-alcohol, cyto-spray).' },
          { id: 'path_ch23_t11', chapterId: 'path_ch23', paperId: 'pathology', title: 'Describe processing of sputum, urine, body fluids and lavage.' },
          { id: 'path_ch23_t12', chapterId: 'path_ch23', paperId: 'pathology', title: 'Write a note on Millipore / polycarbonate membrane filtration and cytocentrifugation.' },
          { id: 'path_ch23_t13', chapterId: 'path_ch23', paperId: 'pathology', title: 'Explain processing of haemorrhagic fluid (Carnoy fixative / saponin lysis).' },
          { id: 'path_ch23_t14', chapterId: 'path_ch23', paperId: 'pathology', title: 'Define cell block and write its preparation methods (plasma-thrombin, agar method).' }
        ]
      },
      {
        id: 'path_ch24',
        chapterNumber: 24,
        title: 'Routine Cytology Staining',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch24_t1', chapterId: 'path_ch24', paperId: 'pathology', title: 'Write the principle of Papanicolaou (PAP) stain.' },
          { id: 'path_ch24_t2', chapterId: 'path_ch24', paperId: 'pathology', title: 'List dyes used in PAP staining (Harris Haematoxylin, OG-6, EA-36/EA-50).' },
          { id: 'path_ch24_t3', chapterId: 'path_ch24', paperId: 'pathology', title: 'Write basic steps of PAP staining.' },
          { id: 'path_ch24_t4', chapterId: 'path_ch24', paperId: 'pathology', title: 'Describe detailed PAP staining procedure.' },
          { id: 'path_ch24_t5', chapterId: 'path_ch24', paperId: 'pathology', title: 'What is bluing solution and its significance in PAP stain?' },
          { id: 'path_ch24_t6', chapterId: 'path_ch24', paperId: 'pathology', title: 'Write precautions in PAP staining to avoid air-drying.' },
          { id: 'path_ch24_t7', chapterId: 'path_ch24', paperId: 'pathology', title: 'Explain May-Grunwald-Giemsa (MGG) air-dried stain.' },
          { id: 'path_ch24_t8', chapterId: 'path_ch24', paperId: 'pathology', title: 'Explain Diff-Quick stain.' },
          { id: 'path_ch24_t9', chapterId: 'path_ch24', paperId: 'pathology', title: 'Differentiate PAP, MGG and Diff-Quick staining.' }
        ]
      },
      {
        id: 'path_ch25',
        chapterNumber: 25,
        title: 'Liquid-Based Cytology',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch25_t1', chapterId: 'path_ch25', paperId: 'pathology', title: 'Define liquid-based cytology (LBC).' },
          { id: 'path_ch25_t2', chapterId: 'path_ch25', paperId: 'pathology', title: 'Write advantages over conventional smears.' },
          { id: 'path_ch25_t3', chapterId: 'path_ch25', paperId: 'pathology', title: 'Write limitations of liquid-based cytology.' },
          { id: 'path_ch25_t4', chapterId: 'path_ch25', paperId: 'pathology', title: 'Explain ThinPrep technology (filter-based automated transfer).' },
          { id: 'path_ch25_t5', chapterId: 'path_ch25', paperId: 'pathology', title: 'Explain SurePath technology (density gradient centrifugation).' },
          { id: 'path_ch25_t6', chapterId: 'path_ch25', paperId: 'pathology', title: 'Compare ThinPrep and SurePath.' }
        ]
      },
      {
        id: 'path_ch26',
        chapterNumber: 26,
        title: 'Advanced Histology/Cytology Techniques',
        paperId: 'pathology',
        topics: [
          { id: 'path_ch26_t1', chapterId: 'path_ch26', paperId: 'pathology', title: 'Define immunohistochemistry (IHC) / immunocytochemistry (ICC).' },
          { id: 'path_ch26_t2', chapterId: 'path_ch26', paperId: 'pathology', title: 'Explain the basic principle and procedure of IHC/ICC (antigen retrieval, primary/secondary Ab, DAB chromogen).' },
          { id: 'path_ch26_t3', chapterId: 'path_ch26', paperId: 'pathology', title: 'Define flow cytometry and explain its basic principle (hydrodynamic focusing, laser, detectors).' },
          { id: 'path_ch26_t4', chapterId: 'path_ch26', paperId: 'pathology', title: 'Write the basic procedure of flow cytometry in hematolymphoid neoplasms.' },
          { id: 'path_ch26_t5', chapterId: 'path_ch26', paperId: 'pathology', title: 'Define PCR and explain its basic principle (denaturation, annealing, extension).' },
          { id: 'path_ch26_t6', chapterId: 'path_ch26', paperId: 'pathology', title: 'Write the basic procedure and laboratory setup for PCR.' },
          { id: 'path_ch26_t7', chapterId: 'path_ch26', paperId: 'pathology', title: 'Define FISH (Fluorescence In Situ Hybridization) and explain its basic principle.' },
          { id: 'path_ch26_t8', chapterId: 'path_ch26', paperId: 'pathology', title: 'Write the basic procedure of FISH.' },
          { id: 'path_ch26_t9', chapterId: 'path_ch26', paperId: 'pathology', title: 'Differentiate PCR and FISH applications in diagnostic pathology.' }
        ]
      }
    ]
  },
  {
    id: 'microbiology',
    paperCode: 'PAPER II',
    title: 'MICROBIOLOGY',
    description: 'Immunology, Parasitology, Virology, Mycology, Animal Care & Diagnostic Serology',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    chapters: [
      {
        id: 'micro_ch1',
        chapterNumber: 1,
        title: 'Immunology & Serology',
        paperId: 'microbiology',
        topics: [
          { id: 'micro_ch1_t1', chapterId: 'micro_ch1', paperId: 'microbiology', title: 'Define immunity and classify immunity.' },
          { id: 'micro_ch1_t2', chapterId: 'micro_ch1', paperId: 'microbiology', title: 'Define antigen and antibody.' },
          { id: 'micro_ch1_t3', chapterId: 'micro_ch1', paperId: 'microbiology', title: 'Describe immunoglobulins and their classes (IgG, IgM, IgA, IgD, IgE).' },
          { id: 'micro_ch1_t4', chapterId: 'micro_ch1', paperId: 'microbiology', title: 'Explain the complement system (classical, alternative, lectin pathways).' },
          { id: 'micro_ch1_t5', chapterId: 'micro_ch1', paperId: 'microbiology', title: 'Describe antigen-antibody reactions (affinity, avidity, prozone phenomenon).' },
          { id: 'micro_ch1_t6', chapterId: 'micro_ch1', paperId: 'microbiology', title: 'Classify hypersensitivity (Type I, II, III, IV) and give examples.' },
          { id: 'micro_ch1_t7', chapterId: 'micro_ch1', paperId: 'microbiology', title: 'Write diagnostic skin tests used for hypersensitivity.' },
          { id: 'micro_ch1_t8', chapterId: 'micro_ch1', paperId: 'microbiology', title: 'Write a brief note on immunodeficiency diseases including AIDS.' },
          { id: 'micro_ch1_t9', chapterId: 'micro_ch1', paperId: 'microbiology', title: 'Define autoimmunity and write the basic concepts and examples.' },
          { id: 'micro_ch1_t10', chapterId: 'micro_ch1', paperId: 'microbiology', title: 'Explain immunoprophylaxis.' },
          { id: 'micro_ch1_t11', chapterId: 'micro_ch1', paperId: 'microbiology', title: 'Write an immunization schedule overview (National Immunization Schedule).' },
          { id: 'micro_ch1_t12', chapterId: 'micro_ch1', paperId: 'microbiology', title: 'Classify vaccines and state their uses (live attenuated, killed, toxoid, mRNA).' },
          { id: 'micro_ch1_t13', chapterId: 'micro_ch1', paperId: 'microbiology', title: 'Differentiate active and passive immunity.' },
          { id: 'micro_ch1_t14', chapterId: 'micro_ch1', paperId: 'microbiology', title: 'Differentiate innate and acquired immunity.' }
        ]
      },
      {
        id: 'micro_ch2',
        chapterNumber: 2,
        title: 'Parasitology — General & Protozoa',
        paperId: 'microbiology',
        topics: [
          { id: 'micro_ch2_t1', chapterId: 'micro_ch2', paperId: 'microbiology', title: 'Classify medically important parasites.' },
          { id: 'micro_ch2_t2', chapterId: 'micro_ch2', paperId: 'microbiology', title: 'Write general features of medically important parasites.' },
          { id: 'micro_ch2_t3', chapterId: 'micro_ch2', paperId: 'microbiology', title: 'Describe Entamoeba histolytica: morphology, life cycle and diagnosis.' },
          { id: 'micro_ch2_t4', chapterId: 'micro_ch2', paperId: 'microbiology', title: 'Describe Giardia lamblia: morphology, life cycle and diagnosis.' },
          { id: 'micro_ch2_t5', chapterId: 'micro_ch2', paperId: 'microbiology', title: 'Write a note on primary amoebic meningoencephalitis (Naegleria fowleri, Acanthamoeba).' },
          { id: 'micro_ch2_t6', chapterId: 'micro_ch2', paperId: 'microbiology', title: 'Write laboratory diagnosis of intestinal protozoa.' },
          { id: 'micro_ch2_t7', chapterId: 'micro_ch2', paperId: 'microbiology', title: 'Describe stool collection, transport and preservation for parasite examination.' },
          { id: 'micro_ch2_t8', chapterId: 'micro_ch2', paperId: 'microbiology', title: 'Explain saline and iodine wet mount.' },
          { id: 'micro_ch2_t9', chapterId: 'micro_ch2', paperId: 'microbiology', title: 'Write concentration techniques for stool examination (Formol-ether, floatation).' },
          { id: 'micro_ch2_t10', chapterId: 'micro_ch2', paperId: 'microbiology', title: 'Write common ova/cysts and their identifying features.' }
        ]
      },
      {
        id: 'micro_ch3',
        chapterNumber: 3,
        title: 'Malaria & Tissue Parasites',
        paperId: 'microbiology',
        topics: [
          { id: 'micro_ch3_t1', chapterId: 'micro_ch3', paperId: 'microbiology', title: 'Describe malaria parasites and their life cycle (erythrocytic and exoerythrocytic).' },
          { id: 'micro_ch3_t2', chapterId: 'micro_ch3', paperId: 'microbiology', title: 'Write laboratory diagnosis of malaria (microscopy, RDT, QBC).' },
          { id: 'micro_ch3_t3', chapterId: 'micro_ch3', paperId: 'microbiology', title: 'Describe peripheral blood smear examination for malaria (thick and thin smear).' },
          { id: 'micro_ch3_t4', chapterId: 'micro_ch3', paperId: 'microbiology', title: 'Write morphology of important Plasmodium species (P. vivax, P. falciparum, P. malariae, P. ovale).' },
          { id: 'micro_ch3_t5', chapterId: 'micro_ch3', paperId: 'microbiology', title: 'Describe Leishmania donovani and laboratory diagnosis of visceral leishmaniasis (Kala-azar).' },
          { id: 'micro_ch3_t6', chapterId: 'micro_ch3', paperId: 'microbiology', title: 'Write about LD bodies (amastigote and promastigote forms).' }
        ]
      },
      {
        id: 'micro_ch4',
        chapterNumber: 4,
        title: 'Helminths',
        paperId: 'microbiology',
        topics: [
          { id: 'micro_ch4_t1', chapterId: 'micro_ch4', paperId: 'microbiology', title: 'Classify helminths (Cestodes, Trematodes, Nematodes).' },
          { id: 'micro_ch4_t2', chapterId: 'micro_ch4', paperId: 'microbiology', title: 'Describe tapeworms (Taenia saginata, Taenia solium, Echinococcus granulosus).' },
          { id: 'micro_ch4_t3', chapterId: 'micro_ch4', paperId: 'microbiology', title: 'Describe liver and intestinal flukes (Fasciola hepatica, Schistosoma).' },
          { id: 'micro_ch4_t4', chapterId: 'micro_ch4', paperId: 'microbiology', title: 'Classify intestinal nematodes (Ascaris, Ancylostoma, Enterobius, Trichuris, Strongyloides).' },
          { id: 'micro_ch4_t5', chapterId: 'micro_ch4', paperId: 'microbiology', title: 'Write laboratory diagnosis of intestinal nematode infection.' },
          { id: 'micro_ch4_t6', chapterId: 'micro_ch4', paperId: 'microbiology', title: 'Describe filarial worms (Wuchereria bancrofti), nocturnal periodicity, lab diagnosis and compare helminth classes.' }
        ]
      },
      {
        id: 'micro_ch5',
        chapterNumber: 5,
        title: 'Virology — General',
        paperId: 'microbiology',
        topics: [
          { id: 'micro_ch5_t1', chapterId: 'micro_ch5', paperId: 'microbiology', title: 'Define virus and basic viral morphology (capsid, envelope, nucleic acid).' },
          { id: 'micro_ch5_t2', chapterId: 'micro_ch5', paperId: 'microbiology', title: 'Write general characteristics of viruses.' },
          { id: 'micro_ch5_t3', chapterId: 'micro_ch5', paperId: 'microbiology', title: 'Classify viruses in brief (DNA vs RNA viruses).' },
          { id: 'micro_ch5_t4', chapterId: 'micro_ch5', paperId: 'microbiology', title: 'Give examples of viral diseases and routes of transmission.' },
          { id: 'micro_ch5_t5', chapterId: 'micro_ch5', paperId: 'microbiology', title: 'Write specimen collection and transport for virological diagnosis (VTM, cold chain).' },
          { id: 'micro_ch5_t6', chapterId: 'micro_ch5', paperId: 'microbiology', title: 'Describe laboratory diagnosis of viral infections.' },
          { id: 'micro_ch5_t7', chapterId: 'micro_ch5', paperId: 'microbiology', title: 'Write methods of virus culture (embryonated egg, cell culture, animal inoculation).' },
          { id: 'micro_ch5_t8', chapterId: 'micro_ch5', paperId: 'microbiology', title: 'Write the role of serology and molecular tests in viral diagnosis.' }
        ]
      },
      {
        id: 'micro_ch6',
        chapterNumber: 6,
        title: 'Hepatitis Viruses & HIV',
        paperId: 'microbiology',
        topics: [
          { id: 'micro_ch6_t1', chapterId: 'micro_ch6', paperId: 'microbiology', title: 'Name hepatitis viruses (HAV, HBV, HCV, HDV, HEV).' },
          { id: 'micro_ch6_t2', chapterId: 'micro_ch6', paperId: 'microbiology', title: 'Write important features and routes of hepatitis viruses.' },
          { id: 'micro_ch6_t3', chapterId: 'micro_ch6', paperId: 'microbiology', title: 'Write laboratory diagnosis of viral hepatitis (HBsAg, anti-HCV, IgM anti-HAV).' },
          { id: 'micro_ch6_t4', chapterId: 'micro_ch6', paperId: 'microbiology', title: 'Describe HIV and AIDS in brief (structure, gp120, CD4 T cells).' },
          { id: 'micro_ch6_t5', chapterId: 'micro_ch6', paperId: 'microbiology', title: 'Write laboratory diagnosis and surveillance testing strategy for HIV (NACO guidelines).' },
          { id: 'micro_ch6_t6', chapterId: 'micro_ch6', paperId: 'microbiology', title: 'Write specimen collection, transport and post-exposure prophylaxis for HIV.' },
          { id: 'micro_ch6_t7', chapterId: 'micro_ch6', paperId: 'microbiology', title: 'Write serological methods used in viral diagnosis (ELISA, rapid immunochromatography).' }
        ]
      },
      {
        id: 'micro_ch7',
        chapterNumber: 7,
        title: 'Other Important Viruses',
        paperId: 'microbiology',
        topics: [
          { id: 'micro_ch7_t1', chapterId: 'micro_ch7', paperId: 'microbiology', title: 'Write about poliovirus and disease (poliomyelitis, OPV, IPV).' },
          { id: 'micro_ch7_t2', chapterId: 'micro_ch7', paperId: 'microbiology', title: 'Write about rabies virus and disease (Negri bodies, post-exposure prophylaxis).' },
          { id: 'micro_ch7_t3', chapterId: 'micro_ch7', paperId: 'microbiology', title: 'Write about rotavirus and gastroenteritis.' },
          { id: 'micro_ch7_t4', chapterId: 'micro_ch7', paperId: 'microbiology', title: 'Write about measles virus and disease (Koplik spots, MMR).' },
          { id: 'micro_ch7_t5', chapterId: 'micro_ch7', paperId: 'microbiology', title: 'Write about dengue virus and disease (NS1 antigen, IgM/IgG ELISA).' },
          { id: 'micro_ch7_t6', chapterId: 'micro_ch7', paperId: 'microbiology', title: 'Write a brief note on oncogenic viruses (HPV, EBV, HBV, HTLV).' },
          { id: 'micro_ch7_t7', chapterId: 'micro_ch7', paperId: 'microbiology', title: 'Write laboratory diagnosis of selected viral diseases.' }
        ]
      },
      {
        id: 'micro_ch8',
        chapterNumber: 8,
        title: 'Animal Care',
        paperId: 'microbiology',
        topics: [
          { id: 'micro_ch8_t1', chapterId: 'micro_ch8', paperId: 'microbiology', title: 'Write principles of laboratory animal care and ethics (CPCSEA).' },
          { id: 'micro_ch8_t2', chapterId: 'micro_ch8', paperId: 'microbiology', title: 'Describe care of sheep for laboratory blood collection.' },
          { id: 'micro_ch8_t3', chapterId: 'micro_ch8', paperId: 'microbiology', title: 'Explain the procedure to draw blood from sheep (jugular vein venipuncture, defibrination).' },
          { id: 'micro_ch8_t4', chapterId: 'micro_ch8', paperId: 'microbiology', title: 'Write methods of handling laboratory animals (mice, rats, guinea pigs, rabbits).' },
          { id: 'micro_ch8_t5', chapterId: 'micro_ch8', paperId: 'microbiology', title: 'Write feeding of laboratory animals.' },
          { id: 'micro_ch8_t6', chapterId: 'micro_ch8', paperId: 'microbiology', title: 'Write breeding of laboratory animals.' },
          { id: 'micro_ch8_t7', chapterId: 'micro_ch8', paperId: 'microbiology', title: 'List precautions and zoonotic infection prevention while handling laboratory animals.' }
        ]
      },
      {
        id: 'micro_ch9',
        chapterNumber: 9,
        title: 'Mycology — General',
        paperId: 'microbiology',
        topics: [
          { id: 'micro_ch9_t1', chapterId: 'micro_ch9', paperId: 'microbiology', title: 'Classify pathogenic fungi (yeasts, yeast-like, moulds, dimorphic).' },
          { id: 'micro_ch9_t2', chapterId: 'micro_ch9', paperId: 'microbiology', title: 'Write general morphology of fungi (hyphae, spores, conidia).' },
          { id: 'micro_ch9_t3', chapterId: 'micro_ch9', paperId: 'microbiology', title: 'Describe laboratory diagnosis of fungal infections.' },
          { id: 'micro_ch9_t4', chapterId: 'micro_ch9', paperId: 'microbiology', title: 'Explain 10-20% KOH wet mount preparation.' },
          { id: 'micro_ch9_t5', chapterId: 'micro_ch9', paperId: 'microbiology', title: 'Write culture media used for fungi (SDA, potato dextrose agar).' },
          { id: 'micro_ch9_t6', chapterId: 'micro_ch9', paperId: 'microbiology', title: 'Describe fungal culture methods and slide culture.' },
          { id: 'micro_ch9_t7', chapterId: 'micro_ch9', paperId: 'microbiology', title: 'Explain Lactophenol Cotton Blue (LCB) mount.' },
          { id: 'micro_ch9_t8', chapterId: 'micro_ch9', paperId: 'microbiology', title: 'Write precautions in fungal specimen collection and processing.' }
        ]
      },
      {
        id: 'micro_ch10',
        chapterNumber: 10,
        title: 'Important Pathogenic Fungi',
        paperId: 'microbiology',
        topics: [
          { id: 'micro_ch10_t1', chapterId: 'micro_ch10', paperId: 'microbiology', title: 'Write a brief note on dermatophytes (Trichophyton, Microsporum, Epidermophyton).' },
          { id: 'micro_ch10_t2', chapterId: 'micro_ch10', paperId: 'microbiology', title: 'Describe Candida albicans and its laboratory diagnosis (germ tube test, chlamydospores).' },
          { id: 'micro_ch10_t3', chapterId: 'micro_ch10', paperId: 'microbiology', title: 'Describe Aspergillus (A. fumigatus, A. niger, A. flavus) and its laboratory diagnosis.' },
          { id: 'micro_ch10_t4', chapterId: 'micro_ch10', paperId: 'microbiology', title: 'Describe Cryptococcus neoformans and its laboratory diagnosis (India ink preparation).' },
          { id: 'micro_ch10_t5', chapterId: 'micro_ch10', paperId: 'microbiology', title: 'Write a note on opportunistic fungi (Mucor, Rhizopus).' },
          { id: 'micro_ch10_t6', chapterId: 'micro_ch10', paperId: 'microbiology', title: 'Differentiate important fungi based on morphology and laboratory diagnosis.' }
        ]
      },
      {
        id: 'micro_ch11',
        chapterNumber: 11,
        title: 'Serology Practical/Viva Topics',
        paperId: 'microbiology',
        topics: [
          { id: 'micro_ch11_t1', chapterId: 'micro_ch11', paperId: 'microbiology', title: 'Explain Widal test and preparation of Salmonella antigens (TO, TH, AH, BH).' },
          { id: 'micro_ch11_t2', chapterId: 'micro_ch11', paperId: 'microbiology', title: 'Explain VDRL and RPR test for syphilis screening.' },
          { id: 'micro_ch11_t3', chapterId: 'micro_ch11', paperId: 'microbiology', title: 'Write principle and clinical use of RA (Rheumatoid Factor) test.' },
          { id: 'micro_ch11_t4', chapterId: 'micro_ch11', paperId: 'microbiology', title: 'Write principle and use of C-reactive protein (CRP) test.' },
          { id: 'micro_ch11_t5', chapterId: 'micro_ch11', paperId: 'microbiology', title: 'Write principle and use of ASO (Antistreptolysin O) test.' },
          { id: 'micro_ch11_t6', chapterId: 'micro_ch11', paperId: 'microbiology', title: 'Write principle and use of pregnancy test (hCG detection).' },
          { id: 'micro_ch11_t7', chapterId: 'micro_ch11', paperId: 'microbiology', title: 'Write about Australia antigen (HBsAg) testing.' },
          { id: 'micro_ch11_t8', chapterId: 'micro_ch11', paperId: 'microbiology', title: 'Write about toxoplasmosis serology (TORCH profile).' },
          { id: 'micro_ch11_t9', chapterId: 'micro_ch11', paperId: 'microbiology', title: 'Explain ELISA (Direct, Indirect, Sandwich, Competitive).' },
          { id: 'micro_ch11_t10', chapterId: 'micro_ch11', paperId: 'microbiology', title: 'Explain Radioimmunoassay (RIA).' },
          { id: 'micro_ch11_t11', chapterId: 'micro_ch11', paperId: 'microbiology', title: 'Explain gel diffusion techniques (Mancini single radial, Ouchterlony double diffusion).' },
          { id: 'micro_ch11_t12', chapterId: 'micro_ch11', paperId: 'microbiology', title: 'Explain immunoelectrophoresis and counter-current immunoelectrophoresis.' },
          { id: 'micro_ch11_t13', chapterId: 'micro_ch11', paperId: 'microbiology', title: 'Write detection of malaria antigen by ICT and Optimal test.' },
          { id: 'micro_ch11_t14', chapterId: 'micro_ch11', paperId: 'microbiology', title: 'Explain assay of immunoglobulins and compare agglutination and precipitation reactions.' }
        ]
      },
      {
        id: 'micro_ch12',
        chapterNumber: 12,
        title: 'Diagnostic Skin Tests',
        paperId: 'microbiology',
        topics: [
          { id: 'micro_ch12_t1', chapterId: 'micro_ch12', paperId: 'microbiology', title: 'Define skin test and explain Type IV delayed hypersensitivity mechanism.' },
          { id: 'micro_ch12_t2', chapterId: 'micro_ch12', paperId: 'microbiology', title: 'Explain Mantoux / tuberculin test (PPD, induration measurement, interpretation).' },
          { id: 'micro_ch12_t3', chapterId: 'micro_ch12', paperId: 'microbiology', title: 'Explain lepromin test (Mitsuda and Fernandez reaction).' },
          { id: 'micro_ch12_t4', chapterId: 'micro_ch12', paperId: 'microbiology', title: 'Explain Casoni test for hydatid disease.' },
          { id: 'micro_ch12_t5', chapterId: 'micro_ch12', paperId: 'microbiology', title: 'Write other diagnostic skin tests (Schick test, Dick test, Frei test).' },
          { id: 'micro_ch12_t6', chapterId: 'micro_ch12', paperId: 'microbiology', title: 'Write principle, procedure and interpretation of Mantoux test.' }
        ]
      }
    ]
  },
  {
    id: 'biochemistry',
    paperCode: 'PAPER III',
    title: 'BIOCHEMISTRY',
    description: 'Clinical Biochemistry, Organ Function Tests, Instrumentation & Quality Control',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    chapters: [
      {
        id: 'bio_ch1',
        chapterNumber: 1,
        title: 'Glucose Homeostasis',
        paperId: 'biochemistry',
        topics: [
          { id: 'bio_ch1_t1', chapterId: 'bio_ch1', paperId: 'biochemistry', title: 'Define glucose homeostasis.' },
          { id: 'bio_ch1_t2', chapterId: 'bio_ch1', paperId: 'biochemistry', title: 'Explain regulation of blood glucose.' },
          { id: 'bio_ch1_t3', chapterId: 'bio_ch1', paperId: 'biochemistry', title: 'Write the role of insulin in glucose homeostasis.' },
          { id: 'bio_ch1_t4', chapterId: 'bio_ch1', paperId: 'biochemistry', title: 'Write the role of glucagon in glucose homeostasis.' },
          { id: 'bio_ch1_t5', chapterId: 'bio_ch1', paperId: 'biochemistry', title: 'Explain the importance of liver in glucose homeostasis.' },
          { id: 'bio_ch1_t6', chapterId: 'bio_ch1', paperId: 'biochemistry', title: 'Write normal blood glucose-related concepts as taught in class.' },
          { id: 'bio_ch1_t7', chapterId: 'bio_ch1', paperId: 'biochemistry', title: 'Describe laboratory estimation of blood glucose.' },
          { id: 'bio_ch1_t8', chapterId: 'bio_ch1', paperId: 'biochemistry', title: 'Write the principle of glucose estimation method (GOD-POD method).' }
        ]
      },
      {
        id: 'bio_ch2',
        chapterNumber: 2,
        title: 'Diabetes Mellitus & HbA1c',
        paperId: 'biochemistry',
        topics: [
          { id: 'bio_ch2_t1', chapterId: 'bio_ch2', paperId: 'biochemistry', title: 'Define diabetes mellitus.' },
          { id: 'bio_ch2_t2', chapterId: 'bio_ch2', paperId: 'biochemistry', title: 'Classify diabetes mellitus (Type 1, Type 2, GDM, secondary).' },
          { id: 'bio_ch2_t3', chapterId: 'bio_ch2', paperId: 'biochemistry', title: 'Write signs/symptoms and basic laboratory findings of diabetes.' },
          { id: 'bio_ch2_t4', chapterId: 'bio_ch2', paperId: 'biochemistry', title: 'Explain diagnostic laboratory investigations for diabetes.' },
          { id: 'bio_ch2_t5', chapterId: 'bio_ch2', paperId: 'biochemistry', title: 'Define HbA1c, its principle and clinical significance.' },
          { id: 'bio_ch2_t6', chapterId: 'bio_ch2', paperId: 'biochemistry', title: 'Differentiate fasting blood glucose, postprandial glucose and HbA1c.' },
          { id: 'bio_ch2_t7', chapterId: 'bio_ch2', paperId: 'biochemistry', title: 'Write the role of glucose tolerance test (OGTT) and describe its procedure.' }
        ]
      },
      {
        id: 'bio_ch3',
        chapterNumber: 3,
        title: 'Lipoproteins & Hyperlipoproteinemia',
        paperId: 'biochemistry',
        topics: [
          { id: 'bio_ch3_t1', chapterId: 'bio_ch3', paperId: 'biochemistry', title: 'Define lipoprotein.' },
          { id: 'bio_ch3_t2', chapterId: 'bio_ch3', paperId: 'biochemistry', title: 'Classify lipoproteins (Chylomicrons, VLDL, IDL, LDL, HDL).' },
          { id: 'bio_ch3_t3', chapterId: 'bio_ch3', paperId: 'biochemistry', title: 'Write composition/functions of major lipoproteins and apolipoproteins.' },
          { id: 'bio_ch3_t4', chapterId: 'bio_ch3', paperId: 'biochemistry', title: 'Explain cholesterol transport (forward vs reverse cholesterol transport).' },
          { id: 'bio_ch3_t5', chapterId: 'bio_ch3', paperId: 'biochemistry', title: 'Define hyperlipoproteinemia and Fredrickson classification.' },
          { id: 'bio_ch3_t6', chapterId: 'bio_ch3', paperId: 'biochemistry', title: 'Write laboratory investigations of lipid disorders.' },
          { id: 'bio_ch3_t7', chapterId: 'bio_ch3', paperId: 'biochemistry', title: 'Explain lipid profile and specimen fasting requirements.' },
          { id: 'bio_ch3_t8', chapterId: 'bio_ch3', paperId: 'biochemistry', title: 'Write about cholesterol (CHOD-PAP) and triglycerides (GPO-PAP) estimation.' },
          { id: 'bio_ch3_t9', chapterId: 'bio_ch3', paperId: 'biochemistry', title: 'Write about HDL cholesterol estimation and Friedewald formula calculation for LDL.' }
        ]
      },
      {
        id: 'bio_ch4',
        chapterNumber: 4,
        title: 'Liver Function Tests',
        paperId: 'biochemistry',
        topics: [
          { id: 'bio_ch4_t1', chapterId: 'bio_ch4', paperId: 'biochemistry', title: 'Define liver function test.' },
          { id: 'bio_ch4_t2', chapterId: 'bio_ch4', paperId: 'biochemistry', title: 'List biochemical parameters of LFT.' },
          { id: 'bio_ch4_t3', chapterId: 'bio_ch4', paperId: 'biochemistry', title: 'Explain bilirubin estimation (Malloy-Evelyn, Jendrassik-Grof) and interpretation.' },
          { id: 'bio_ch4_t4', chapterId: 'bio_ch4', paperId: 'biochemistry', title: 'Write the significance of total, conjugated (direct) and unconjugated (indirect) bilirubin.' },
          { id: 'bio_ch4_t5', chapterId: 'bio_ch4', paperId: 'biochemistry', title: 'Write the clinical significance of AST (SGOT) and ALT (SGPT).' },
          { id: 'bio_ch4_t6', chapterId: 'bio_ch4', paperId: 'biochemistry', title: 'Write the significance of alkaline phosphatase (ALP) and GGT.' },
          { id: 'bio_ch4_t7', chapterId: 'bio_ch4', paperId: 'biochemistry', title: 'Write the significance of total protein, albumin, and A:G ratio in LFT.' },
          { id: 'bio_ch4_t8', chapterId: 'bio_ch4', paperId: 'biochemistry', title: 'Explain the pattern of LFT changes in pre-hepatic, hepatic and obstructive jaundice.' }
        ]
      },
      {
        id: 'bio_ch5',
        chapterNumber: 5,
        title: 'Renal Function Tests',
        paperId: 'biochemistry',
        topics: [
          { id: 'bio_ch5_t1', chapterId: 'bio_ch5', paperId: 'biochemistry', title: 'Define renal function test.' },
          { id: 'bio_ch5_t2', chapterId: 'bio_ch5', paperId: 'biochemistry', title: 'List major RFT parameters.' },
          { id: 'bio_ch5_t3', chapterId: 'bio_ch5', paperId: 'biochemistry', title: 'Explain serum urea estimation (Berthelot / GLDH method) and significance.' },
          { id: 'bio_ch5_t4', chapterId: 'bio_ch5', paperId: 'biochemistry', title: "Explain serum creatinine estimation (Jaffe's alkaline picrate method) and significance." },
          { id: 'bio_ch5_t5', chapterId: 'bio_ch5', paperId: 'biochemistry', title: 'Explain uric acid estimation (Uricase-PAP method) and significance in gout.' },
          { id: 'bio_ch5_t6', chapterId: 'bio_ch5', paperId: 'biochemistry', title: 'Describe 24-hour urine collection and volume measurement.' },
          { id: 'bio_ch5_t7', chapterId: 'bio_ch5', paperId: 'biochemistry', title: 'Write urine preservation methods (thymol, toluene, acid, refrigeration).' },
          { id: 'bio_ch5_t8', chapterId: 'bio_ch5', paperId: 'biochemistry', title: 'Write physical characteristics examined in urine (color, specific gravity, pH, volume).' },
          { id: 'bio_ch5_t9', chapterId: 'bio_ch5', paperId: 'biochemistry', title: 'Explain renal clearance tests (Creatinine clearance, eGFR).' },
          { id: 'bio_ch5_t10', chapterId: 'bio_ch5', paperId: 'biochemistry', title: 'Write laboratory findings used to assess acute and chronic renal failure.' }
        ]
      },
      {
        id: 'bio_ch6',
        chapterNumber: 6,
        title: 'Thyroid Function Tests',
        paperId: 'biochemistry',
        topics: [
          { id: 'bio_ch6_t1', chapterId: 'bio_ch6', paperId: 'biochemistry', title: 'Define thyroid function tests.' },
          { id: 'bio_ch6_t2', chapterId: 'bio_ch6', paperId: 'biochemistry', title: 'Name T3 (triiodothyronine), T4 (thyroxine) and TSH (thyroid-stimulating hormone).' },
          { id: 'bio_ch6_t3', chapterId: 'bio_ch6', paperId: 'biochemistry', title: 'Write the role of TSH and pituitary-thyroid feedback axis.' },
          { id: 'bio_ch6_t4', chapterId: 'bio_ch6', paperId: 'biochemistry', title: 'Write the role and physiology of T3 and T4.' },
          { id: 'bio_ch6_t5', chapterId: 'bio_ch6', paperId: 'biochemistry', title: 'Explain laboratory testing of T3, T4 and TSH (CLIA, ELISA).' },
          { id: 'bio_ch6_t6', chapterId: 'bio_ch6', paperId: 'biochemistry', title: 'Interpret common patterns of TSH/T3/T4 in primary vs secondary hypo/hyperthyroidism.' },
          { id: 'bio_ch6_t7', chapterId: 'bio_ch6', paperId: 'biochemistry', title: 'Write clinical significance of TFT.' }
        ]
      },
      {
        id: 'bio_ch7',
        chapterNumber: 7,
        title: 'Alimentary/Gastric Function Tests',
        paperId: 'biochemistry',
        topics: [
          { id: 'bio_ch7_t1', chapterId: 'bio_ch7', paperId: 'biochemistry', title: 'Define gastric function test.' },
          { id: 'bio_ch7_t2', chapterId: 'bio_ch7', paperId: 'biochemistry', title: 'Write important gastric function tests (Fractional test meal, Histamine / Pentagastrin test).' },
          { id: 'bio_ch7_t3', chapterId: 'bio_ch7', paperId: 'biochemistry', title: 'Write the basic procedure/collection considerations for gastric analysis (Ryle tube).' },
          { id: 'bio_ch7_t4', chapterId: 'bio_ch7', paperId: 'biochemistry', title: 'Write the clinical significance of gastric function tests (hyperchlorhydria, achlorhydria, Zollinger-Ellison).' },
          { id: 'bio_ch7_t5', chapterId: 'bio_ch7', paperId: 'biochemistry', title: 'Differentiate gastric and pancreatic function testing.' }
        ]
      },
      {
        id: 'bio_ch8',
        chapterNumber: 8,
        title: 'Pancreatic Function Tests',
        paperId: 'biochemistry',
        topics: [
          { id: 'bio_ch8_t1', chapterId: 'bio_ch8', paperId: 'biochemistry', title: 'List pancreatic function tests.' },
          { id: 'bio_ch8_t2', chapterId: 'bio_ch8', paperId: 'biochemistry', title: 'Write clinical significance of serum amylase in acute pancreatitis.' },
          { id: 'bio_ch8_t3', chapterId: 'bio_ch8', paperId: 'biochemistry', title: 'Write clinical significance of serum lipase (specificity and half-life).' },
          { id: 'bio_ch8_t4', chapterId: 'bio_ch8', paperId: 'biochemistry', title: 'Write a note on serum trypsin, urinary amylase, and fecal elastase.' },
          { id: 'bio_ch8_t5', chapterId: 'bio_ch8', paperId: 'biochemistry', title: 'Compare amylase, lipase and trypsin in pancreatic assessment.' }
        ]
      },
      {
        id: 'bio_ch9',
        chapterNumber: 9,
        title: 'Biochemical Tests of CSF',
        paperId: 'biochemistry',
        topics: [
          { id: 'bio_ch9_t1', chapterId: 'bio_ch9', paperId: 'biochemistry', title: 'List biochemical constituents tested in cerebrospinal fluid (CSF).' },
          { id: 'bio_ch9_t2', chapterId: 'bio_ch9', paperId: 'biochemistry', title: 'Explain CSF glucose estimation and CSF-to-plasma glucose ratio.' },
          { id: 'bio_ch9_t3', chapterId: 'bio_ch9', paperId: 'biochemistry', title: 'Explain CSF protein estimation and Pandy test for globulin.' },
          { id: 'bio_ch9_t4', chapterId: 'bio_ch9', paperId: 'biochemistry', title: 'Write the clinical significance of CSF biochemical tests in bacterial, viral and tubercular meningitis.' },
          { id: 'bio_ch9_t5', chapterId: 'bio_ch9', paperId: 'biochemistry', title: 'Write specimen handling considerations for CSF biochemical examination (lumbar puncture, immediate processing).' }
        ]
      },
      {
        id: 'bio_ch10',
        chapterNumber: 10,
        title: 'Water & Electrolyte Balance',
        paperId: 'biochemistry',
        topics: [
          { id: 'bio_ch10_t1', chapterId: 'bio_ch10', paperId: 'biochemistry', title: 'Define water balance and body fluid compartments (ICF vs ECF).' },
          { id: 'bio_ch10_t2', chapterId: 'bio_ch10', paperId: 'biochemistry', title: 'Define electrolyte balance.' },
          { id: 'bio_ch10_t3', chapterId: 'bio_ch10', paperId: 'biochemistry', title: 'Name major body electrolytes (Na+, K+, Cl-, HCO3-).' },
          { id: 'bio_ch10_t4', chapterId: 'bio_ch10', paperId: 'biochemistry', title: 'Explain the role of sodium and potassium in cell membrane potential and osmolarity.' },
          { id: 'bio_ch10_t5', chapterId: 'bio_ch10', paperId: 'biochemistry', title: 'Write factors affecting water balance (ADH, aldosterone, thirst mechanism).' },
          { id: 'bio_ch10_t6', chapterId: 'bio_ch10', paperId: 'biochemistry', title: 'Write causes and clinical signs of electrolyte imbalance (hyponatremia, hyperkalemia, etc.).' },
          { id: 'bio_ch10_t7', chapterId: 'bio_ch10', paperId: 'biochemistry', title: 'Explain laboratory assessment of electrolytes (Ion Selective Electrode - ISE).' },
          { id: 'bio_ch10_t8', chapterId: 'bio_ch10', paperId: 'biochemistry', title: 'Write the importance of maintaining acid-base/electrolyte balance and anion gap.' }
        ]
      },
      {
        id: 'bio_ch11',
        chapterNumber: 11,
        title: 'Instrumentation & Maintenance',
        paperId: 'biochemistry',
        topics: [
          { id: 'bio_ch11_t1', chapterId: 'bio_ch11', paperId: 'biochemistry', title: "Write the principle of colorimetry (Beer-Lambert's Law)." },
          { id: 'bio_ch11_t2', chapterId: 'bio_ch11', paperId: 'biochemistry', title: 'Explain the basic parts and optical path of a colorimeter.' },
          { id: 'bio_ch11_t3', chapterId: 'bio_ch11', paperId: 'biochemistry', title: 'Write an overview of a semi-automated clinical chemistry analyzer.' },
          { id: 'bio_ch11_t4', chapterId: 'bio_ch11', paperId: 'biochemistry', title: 'List routine instrument maintenance steps (daily, weekly, cuvette cleaning).' },
          { id: 'bio_ch11_t5', chapterId: 'bio_ch11', paperId: 'biochemistry', title: 'Write precautions in operating laboratory spectrophotometers/analyzers.' },
          { id: 'bio_ch11_t6', chapterId: 'bio_ch11', paperId: 'biochemistry', title: 'Write common causes of instrument-related errors.' }
        ]
      },
      {
        id: 'bio_ch12',
        chapterNumber: 12,
        title: 'Quality Control, Errors & Prevention',
        paperId: 'biochemistry',
        topics: [
          { id: 'bio_ch12_t1', chapterId: 'bio_ch12', paperId: 'biochemistry', title: 'Define quality control and standards vs controls.' },
          { id: 'bio_ch12_t2', chapterId: 'bio_ch12', paperId: 'biochemistry', title: 'Define laboratory error.' },
          { id: 'bio_ch12_t3', chapterId: 'bio_ch12', paperId: 'biochemistry', title: 'Classify laboratory errors: random errors vs systematic errors.' },
          { id: 'bio_ch12_t4', chapterId: 'bio_ch12', paperId: 'biochemistry', title: 'Write pre-analytical, analytical and post-analytical errors.' },
          { id: 'bio_ch12_t5', chapterId: 'bio_ch12', paperId: 'biochemistry', title: 'Write common causes of laboratory errors in specimen collection and handling.' },
          { id: 'bio_ch12_t6', chapterId: 'bio_ch12', paperId: 'biochemistry', title: 'Explain methods of preventing laboratory errors and SOP implementation.' },
          { id: 'bio_ch12_t7', chapterId: 'bio_ch12', paperId: 'biochemistry', title: 'Write the importance of internal quality control (IQC) and Levey-Jennings chart.' },
          { id: 'bio_ch12_t8', chapterId: 'bio_ch12', paperId: 'biochemistry', title: 'Write quality-control points and Westgard multirules in biochemical testing.' }
        ]
      },
      {
        id: 'bio_ch13',
        chapterNumber: 13,
        title: 'Practical & Viva Question Bank',
        paperId: 'biochemistry',
        topics: [
          { id: 'bio_ch13_t1', chapterId: 'bio_ch13', paperId: 'biochemistry', title: "Explain principle of colorimetry and verification of Beer's Law." },
          { id: 'bio_ch13_t2', chapterId: 'bio_ch13', paperId: 'biochemistry', title: 'Describe blood/serum glucose estimation viva points and normal ranges.' },
          { id: 'bio_ch13_t3', chapterId: 'bio_ch13', paperId: 'biochemistry', title: 'Explain glucose tolerance test viva questions and patient preparation.' },
          { id: 'bio_ch13_t4', chapterId: 'bio_ch13', paperId: 'biochemistry', title: 'Describe urea quantitation principle, reagents and calculation.' },
          { id: 'bio_ch13_t5', chapterId: 'bio_ch13', paperId: 'biochemistry', title: 'Describe creatinine quantitation (Jaffe method) viva points.' },
          { id: 'bio_ch13_t6', chapterId: 'bio_ch13', paperId: 'biochemistry', title: 'Describe uric acid quantitation principle and clinical implications.' },
          { id: 'bio_ch13_t7', chapterId: 'bio_ch13', paperId: 'biochemistry', title: 'Explain cholesterol estimation (CHOD-PAP) practical procedure.' },
          { id: 'bio_ch13_t8', chapterId: 'bio_ch13', paperId: 'biochemistry', title: 'Explain triglyceride estimation (GPO-PAP) practical procedure.' },
          { id: 'bio_ch13_t9', chapterId: 'bio_ch13', paperId: 'biochemistry', title: 'Explain HDL cholesterol estimation practical procedure.' },
          { id: 'bio_ch13_t10', chapterId: 'bio_ch13', paperId: 'biochemistry', title: 'Explain lipid profile viva questions and reference ranges.' },
          { id: 'bio_ch13_t11', chapterId: 'bio_ch13', paperId: 'biochemistry', title: 'Describe total serum protein estimation (Biuret method).' },
          { id: 'bio_ch13_t12', chapterId: 'bio_ch13', paperId: 'biochemistry', title: 'Describe albumin estimation (Bromocresol Green - BCG method).' },
          { id: 'bio_ch13_t13', chapterId: 'bio_ch13', paperId: 'biochemistry', title: 'Interpret T3, T4 and TSH clinical case scenarios in viva.' },
          { id: 'bio_ch13_t14', chapterId: 'bio_ch13', paperId: 'biochemistry', title: 'Write the basic principle of agarose gel and cellulose acetate electrophoresis.' },
          { id: 'bio_ch13_t15', chapterId: 'bio_ch13', paperId: 'biochemistry', title: 'Write the basic principle of paper and thin-layer chromatography (TLC).' }
        ]
      }
    ]
  }
];

export const TOTAL_TOPICS_COUNT = DMLT_PAPERS.reduce(
  (paperAcc, paper) => paperAcc + paper.chapters.reduce(
    (chAcc, chapter) => chAcc + chapter.topics.length, 0
  ),
  0
);
