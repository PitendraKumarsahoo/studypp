import { MCQQuestion, Topic } from '../types';

// Topic-specific knowledge bases and procedural generators designed for DMLT 2nd Year
interface QuestionTemplate {
  q: string;
  options: [string, string, string, string];
  answer: number;
  explanation: string;
}

// Global seedable/shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Extensive topic-specific question builder
export function getQuestionsForTopic(topic: Topic): MCQQuestion[] {
  const templates: QuestionTemplate[] = [];
  const { id, title, chapterId, paperId } = topic;

  // Add chapter/topic specific medical knowledge questions
  buildDomainQuestions(paperId, chapterId, id, title, templates);

  // Ensure there are at least 32-40 unique questions in the pool so 30 can be selected without duplication
  ensureMinimumQuestionCount(topic, templates);

  // Pick exactly 30 unique questions
  const shuffled = shuffleArray(templates);
  const selected = shuffled.slice(0, 30);

  return selected.map((t, idx) => ({
    id: `${topic.id}_q_${idx + 1}`,
    question: t.q,
    options: t.options,
    correctAnswer: t.answer,
    explanation: t.explanation
  }));
}

function buildDomainQuestions(
  paperId: string,
  chapterId: string,
  topicId: string,
  title: string,
  templates: QuestionTemplate[]
) {
  const lowerTitle = title.toLowerCase();

  // PATHOLOGY DOMAINS
  if (paperId === 'pathology') {
    if (chapterId.includes('ch1') || lowerTitle.includes('immunohematology') || lowerTitle.includes('secretor') || lowerTitle.includes('h gene')) {
      templates.push(
        {
          q: 'What is the primary function of the H gene in the ABO blood group system?',
          options: ['Transfers L-fucose to precursor substance', 'Adds N-acetylgalactosamine to O antigen', 'Directly produces anti-A antibodies', 'Synthesizes Rh polypeptides'],
          answer: 0,
          explanation: 'The H gene (FUT1) encodes alpha-1,2-fucosyltransferase which attaches L-fucose to the precursor oligosaccharide, forming the H antigen.'
        },
        {
          q: 'Which sugar imparts group A specificity to the precursor substance?',
          options: ['N-acetylgalactosamine', 'D-galactose', 'L-fucose', 'D-glucose'],
          answer: 0,
          explanation: 'Group A enzyme adds N-acetylgalactosamine (GalNAc) to the H substance.'
        },
        {
          q: 'Which sugar confers group B antigen specificity on RBCs?',
          options: ['D-galactose', 'N-acetylgalactosamine', 'L-fucose', 'Sialic acid'],
          answer: 0,
          explanation: 'The B gene produces galactosyltransferase which attaches D-galactose to the H antigen.'
        },
        {
          q: 'Individuals who inherit hh genotype and cannot produce H antigen on RBCs belong to which phenotype?',
          options: ['Bombay phenotype (Oh)', 'Secretor positive phenotype', 'Du variant', 'Rh null phenotype'],
          answer: 0,
          explanation: 'Bombay phenotype (Oh) lacks the H gene (hh) and therefore lacks H, A, and B antigens on RBCs.'
        },
        {
          q: 'Which antibodies are naturally present in the serum of a Bombay phenotype person?',
          options: ['Anti-A, Anti-B, and Anti-H', 'Only Anti-A', 'Only Anti-H', 'No ABO antibodies'],
          answer: 0,
          explanation: 'Because Bombay individuals completely lack H antigen, they form potent Anti-H in addition to Anti-A and Anti-B.'
        },
        {
          q: 'What percentage of the population are secretors of ABH antigens in body fluids?',
          options: ['Approximately 80%', 'Approximately 20%', '100%', 'Less than 5%'],
          answer: 0,
          explanation: 'About 80% of individuals inherit the Se gene (SeSe or Sese) and secrete water-soluble ABH antigens in saliva and body fluids.'
        },
        {
          q: 'Which lectin is specifically used to test for the presence of H antigen?',
          options: ['Ulex europaeus', 'Dolichos biflorus', 'Bandeiraea simplicifolia', 'Vicia faba'],
          answer: 0,
          explanation: 'Anti-H lectin is derived from the seeds of Ulex europaeus and agglutinates RBCs with H antigen.'
        },
        {
          q: 'Which lectin differentiates A1 from A2 subgroup of red cells?',
          options: ['Dolichos biflorus', 'Ulex europaeus', 'Arachis hypogaea', 'Salvia sclarea'],
          answer: 0,
          explanation: 'Dolichos biflorus seed extract serves as Anti-A1 lectin, agglutinating A1 cells but not A2 cells.'
        },
        {
          q: 'Immunohematology deals with the study of:',
          options: ['Antigen-antibody reactions related to blood components', 'Bacterial toxins in blood', 'Renal clearance kinetics', 'Hormonal assays in serum'],
          answer: 0,
          explanation: 'Immunohematology (blood banking) focuses on immune responses and antigen-antibody interactions involving blood cells.'
        },
        {
          q: 'The Se (secretor) gene is located on which human chromosome?',
          options: ['Chromosome 19', 'Chromosome 9', 'Chromosome 1', 'Chromosome 6'],
          answer: 0,
          explanation: 'The Se gene (FUT2) and H gene (FUT1) are located closely linked on chromosome 19.'
        }
      );
    }

    if (chapterId.includes('ch2') || lowerTitle.includes('antigen') || lowerTitle.includes('antibody') || lowerTitle.includes('immunoglobulin')) {
      templates.push(
        {
          q: 'Which immunoglobulin class predominantly acts as "complete" or saline-agglutinating antibody?',
          options: ['IgM', 'IgG', 'IgA', 'IgE'],
          answer: 0,
          explanation: 'IgM is a pentamer with high molecular weight and 10 binding sites, capable of direct agglutination in saline.'
        },
        {
          q: 'Which immunoglobulin class can cross the human placental barrier?',
          options: ['IgG', 'IgM', 'IgA', 'IgE'],
          answer: 0,
          explanation: 'IgG is a monomeric antibody capable of crossing the placenta to protect the fetus or cause HDN.'
        },
        {
          q: 'The strength of an individual antigen-antibody bond at a single epitope is called:',
          options: ['Affinity', 'Avidity', 'Prozone', 'Postzone'],
          answer: 0,
          explanation: 'Affinity is the chemical binding strength between an epitope and a single paratope.'
        },
        {
          q: 'The overall combined binding power of a multivalent antibody with a multivalent antigen is known as:',
          options: ['Avidity', 'Affinity', 'Cross-reactivity', 'Titer'],
          answer: 0,
          explanation: 'Avidity measures the total functional binding strength of multivalent interactions.'
        },
        {
          q: 'False negative agglutination caused by antibody excess is referred to as:',
          options: ['Prozone phenomenon', 'Postzone phenomenon', 'Zone of equivalence', 'Rouleaux formation'],
          answer: 0,
          explanation: 'Prozone occurs when excess uncomplexed antibody blocks lattice formation, preventing visible agglutination.'
        },
        {
          q: 'Naturally occurring ABO antibodies belong primarily to which class in group A and B individuals?',
          options: ['IgM', 'IgG', 'IgE', 'IgD'],
          answer: 0,
          explanation: 'Group A and B serum contains predominantly IgM anti-B and anti-A respectively; group O serum has significant IgG.'
        },
        {
          q: 'Which factor lowers the zeta potential between red blood cells to enhance IgG agglutination?',
          options: ['Bovine serum albumin / LISS', 'Distilled water', 'Heparin', 'Sodium citrate'],
          answer: 0,
          explanation: 'Enhancement media like albumin, LISS, or enzymes reduce the dielectric constant and zeta potential between RBCs.'
        },
        {
          q: 'At what optimum temperature do cold antibodies (such as Anti-I and naturally occurring Anti-M) react?',
          options: ['4°C to 22°C', '37°C', '56°C', '60°C'],
          answer: 0,
          explanation: 'Cold agglutinins typically react best at lower temperatures (4°C to room temperature).'
        }
      );
    }

    if (chapterId.includes('ch3') || lowerTitle.includes('abo blood group') || lowerTitle.includes('forward grouping') || lowerTitle.includes('tube method')) {
      templates.push(
        {
          q: 'Who discovered the ABO blood group system in 1900?',
          options: ['Karl Landsteiner', 'Alexander Wiener', 'Philip Levine', 'Robin Coombs'],
          answer: 0,
          explanation: 'Karl Landsteiner discovered the ABO blood group system in 1900 and received the Nobel Prize in 1930.'
        },
        {
          q: 'What is the optimal concentration of RBC suspension used in standard tube blood grouping?',
          options: ['2% to 5%', '10% to 15%', '20% to 30%', '50%'],
          answer: 0,
          explanation: 'A 2% to 5% red cell suspension provides the ideal antigen-antibody ratio for tube testing.'
        },
        {
          q: 'Forward (front) grouping determines:',
          options: ['Antigens on the patient’s red blood cells', 'Antibodies in the patient’s serum', 'Secretor status', 'Rh genotype'],
          answer: 0,
          explanation: 'Forward grouping uses known antisera (Anti-A, Anti-B, Anti-D) to detect unknown RBC surface antigens.'
        },
        {
          q: 'Reverse (back) grouping determines:',
          options: ['Antibodies in the patient’s serum/plasma', 'Antigens on red blood cells', 'Hemoglobin variants', 'RBC survival rate'],
          answer: 0,
          explanation: 'Reverse grouping uses known A and B red blood cells to identify agglutinins present in patient serum.'
        },
        {
          q: 'What color dye is added to commercial Anti-A antiserum as per international standards?',
          options: ['Blue (Patent Blue / Methylene Blue)', 'Yellow (Tartrazine / Acriflavine)', 'Red', 'Green'],
          answer: 0,
          explanation: 'Commercial Anti-A is tinted blue, while Anti-B is tinted yellow to prevent laboratory errors.'
        },
        {
          q: 'What color dye is added to commercial Anti-B antiserum?',
          options: ['Yellow', 'Blue', 'Colorless', 'Purple'],
          answer: 0,
          explanation: 'Anti-B antiserum is colored yellow for standard visual identification.'
        },
        {
          q: 'A blood sample shows agglutination with Anti-A, no agglutination with Anti-B, and serum agglutinates B cells. What is the blood group?',
          options: ['Group A', 'Group B', 'Group AB', 'Group O'],
          answer: 0,
          explanation: 'Positive forward reaction with Anti-A and reverse agglutination with B cells confirms blood group A.'
        },
        {
          q: 'A blood sample shows agglutination with neither Anti-A nor Anti-B, while serum agglutinates both A cells and B cells. What is the blood group?',
          options: ['Group O', 'Group AB', 'Group A', 'Bombay phenotype'],
          answer: 0,
          explanation: 'No antigens on RBCs and both anti-A and anti-B in serum corresponds to standard group O.'
        },
        {
          q: 'Why is slide grouping considered unsuitable for routine cross-matching or donor confirmation?',
          options: ['Risk of drying and lower sensitivity to weak subgroups', 'It requires 24 hours of incubation', 'It destroys RBC antigens', 'It requires radioactive isotopes'],
          answer: 0,
          explanation: 'Slide method has lower sensitivity, dries quickly, and cannot reliably detect weak agglutinins or resolve discrepancies.'
        }
      );
    }

    if (chapterId.includes('ch4') || lowerTitle.includes('rh blood group') || lowerTitle.includes('du variant')) {
      templates.push(
        {
          q: 'Which antigen in the Rh blood group system is the most immunogenic?',
          options: ['D antigen', 'C antigen', 'c antigen', 'E antigen'],
          answer: 0,
          explanation: 'The D antigen is second only to ABO in immunogenicity and defines Rh positivity or negativity.'
        },
        {
          q: 'A blood donor whose red cells are initially negative for D in direct tube test but agglutinate in Indirect Antiglobulin Test (IAT) is called:',
          options: ['Weak D (Du variant)', 'Partial D', 'Rh null', 'D-deletion'],
          answer: 0,
          explanation: 'Weak D (formerly Du) has quantitative reduction of D antigen, detectable only by the indirect antiglobulin phase.'
        },
        {
          q: 'How should a blood donor testing as Weak D positive be classified for transfusion purposes?',
          options: ['Classified as Rh Positive', 'Classified as Rh Negative', 'Classified as Bombay', 'Classified as group AB'],
          answer: 0,
          explanation: 'Weak D blood donors must be labeled Rh Positive to prevent sensitizing an Rh-negative recipient.'
        },
        {
          q: 'How should a patient (recipient) testing as Weak D positive preferably be transfused in elective situations?',
          options: ['Rh Negative blood', 'Rh Positive blood', 'Bombay blood', 'Any ABO type'],
          answer: 0,
          explanation: 'Weak D recipients (especially partial D) are treated as Rh Negative and given Rh-negative blood to prevent alloimmunization.'
        },
        {
          q: 'Which genetic theory of Rh inheritance was proposed by Fisher and Race?',
          options: ['Three closely linked gene loci (C/c, D/d, E/e)', 'Single gene locus with multiple alleles (Wiener)', 'Two independent H and O genes', 'Sex-linked inheritance'],
          answer: 0,
          explanation: 'Fisher-Race theory proposed three pairs of closely linked alleles: C/c, D/d, and E/e.'
        },
        {
          q: 'What is the most frequent Rh genotype in the general Indian population?',
          options: ['R1r (CDe/cde)', 'R2R2 (cDE/cDE)', 'rr (cde/cde)', 'R0r (cDe/cde)'],
          answer: 0,
          explanation: 'R1r (CDe/cde) and R1R1 (CDe/CDe) are the most prevalent Rh genotypes.'
        },
        {
          q: 'Rh antibodies are typically of which immunoglobulin class?',
          options: ['IgG (immune antibodies)', 'IgM (naturally occurring)', 'IgA', 'IgE'],
          answer: 0,
          explanation: 'Rh antibodies are immune IgG antibodies produced after exposure via transfusion or pregnancy, reacting best at 37°C.'
        }
      );
    }

    if (chapterId.includes('ch5') || lowerTitle.includes('coomb') || lowerTitle.includes('antiglobulin') || lowerTitle.includes('dat') || lowerTitle.includes('iat')) {
      templates.push(
        {
          q: 'What is the primary reagent used in the Coomb’s (Antiglobulin) test?',
          options: ['Anti-human globulin (AHG)', 'Bovine albumin 22%', 'Ulex lectin', 'Normal saline 0.9%'],
          answer: 0,
          explanation: 'AHG is prepared by immunizing animals with human IgG or complement to bridge sensitizing antibodies on RBCs.'
        },
        {
          q: 'Direct Antiglobulin Test (DAT) is used to detect:',
          options: ['In vivo sensitization of patient’s RBCs by IgG or complement', 'In vitro antibody in patient serum', 'Bacterial contamination of blood', 'Presence of H antigen'],
          answer: 0,
          explanation: 'DAT detects antibodies or complement bound to red cells in vivo (e.g., in HDN, AIHA, hemolytic transfusion reactions).'
        },
        {
          q: 'Indirect Antiglobulin Test (IAT) is primarily used for:',
          options: ['Detection of incomplete antibodies in patient serum in vitro', 'In vivo hemolysis monitoring', 'Platelet count verification', 'WBC antigen mapping'],
          answer: 0,
          explanation: 'IAT detects unexpected or incomplete IgG antibodies present in patient serum through in vitro incubation with reagent RBCs.'
        },
        {
          q: 'Why must red blood cells be thoroughly washed (usually 3–4 times with saline) before adding AHG reagent?',
          options: ['To remove unbound free serum globulins that neutralize AHG', 'To lyse white blood cells', 'To remove hemoglobin', 'To sterilize the suspension'],
          answer: 0,
          explanation: 'Traces of free serum IgG neutralize the AHG reagent, resulting in false negative Coomb’s test results.'
        },
        {
          q: 'What are "Coomb’s control cells" (check cells) used for in the blood bank?',
          options: ['To confirm true negative AHG tests and verify AHG activity', 'To replace patient serum', 'To detect Rh antigens', 'To dilute saline'],
          answer: 0,
          explanation: 'Check cells are IgG-sensitized RBCs added to negative Coomb’s tubes; failure to agglutinate indicates an invalid test.'
        },
        {
          q: 'In Hemolytic Disease of the Fetus and Newborn (HDFN), which Coomb’s test is performed on cord blood?',
          options: ['Direct Antiglobulin Test (DAT)', 'Indirect Antiglobulin Test (IAT)', 'Cross-match test', 'Reverse grouping'],
          answer: 0,
          explanation: 'Cord blood RBCs are tested with DAT to detect maternal IgG coating the infant’s red cells in utero.'
        }
      );
    }

    if (chapterId.includes('ch6') || lowerTitle.includes('cross-match') || lowerTitle.includes('compatibility')) {
      templates.push(
        {
          q: 'Major cross-match involves mixing:',
          options: ["Donor's red blood cells and recipient's serum", "Recipient's red blood cells and donor's serum", "Donor's serum and recipient's serum", "Donor's RBCs and normal saline"],
          answer: 0,
          explanation: 'Major cross-match detects antibodies in recipient serum that could destroy transfused donor red blood cells.'
        },
        {
          q: 'Minor cross-match involves testing:',
          options: ["Donor's serum with recipient's red blood cells", "Recipient's serum with donor's red cells", "Donor's platelets with donor's serum", "Recipient's saliva with anti-H"],
          answer: 0,
          explanation: 'Minor cross-match tests for antibodies in the donor’s serum directed against recipient red blood cells.'
        },
        {
          q: 'Which phase of cross-matching is most critical for detecting clinically significant incomplete IgG antibodies?',
          options: ['AHG (Antihuman globulin) phase at 37°C', 'Immediate spin saline at room temperature', 'Cold saline phase at 4°C', 'Slide method'],
          answer: 0,
          explanation: 'The AHG phase is the most reliable method for detecting clinically significant IgG antibodies like anti-Rh, anti-Kell, and anti-Duffy.'
        },
        {
          q: 'If agglutination or hemolysis occurs in any phase of the cross-match, the unit of blood is declared:',
          options: ['Incompatible and rejected for transfusion', 'Compatible for transfusion', 'Safe for slow infusion', 'Safe if filtered'],
          answer: 0,
          explanation: 'Agglutination or hemolysis indicates an incompatible cross-match, precluding safe transfusion of that unit.'
        },
        {
          q: 'What is the role of LISS (Low Ionic Strength Saline) in cross-matching?',
          options: ['Accelerates antibody binding and shortens incubation time to 15 min', 'Neutralizes anti-D antibodies', 'Acts as a preservative', 'Dissolves fibrin clots'],
          answer: 0,
          explanation: 'LISS reduces ionic shielding around RBCs, enhancing antibody uptake and reducing incubation time from 45 min to 10-15 min.'
        }
      );
    }

    if (chapterId.includes('ch8') || lowerTitle.includes('blood banking') || lowerTitle.includes('donor') || lowerTitle.includes('component')) {
      templates.push(
        {
          q: 'What is the minimum hemoglobin required for a voluntary blood donor in India?',
          options: ['12.5 g/dL', '10.0 g/dL', '14.0 g/dL', '11.0 g/dL'],
          answer: 0,
          explanation: 'Standard blood donor guidelines require a minimum hemoglobin concentration of 12.5 g/dL.'
        },
        {
          q: 'What is the standard storage temperature for Packed Red Blood Cells (PRBC)?',
          options: ['2°C to 6°C', '-20°C', '20°C to 24°C', '37°C'],
          answer: 0,
          explanation: 'PRBC units are stored in monitored blood bank refrigerators maintained strictly between 2°C and 6°C.'
        },
        {
          q: 'What is the shelf life of whole blood collected in CPDA-1 anticoagulant preservative solution?',
          options: ['35 days', '21 days', '42 days', '14 days'],
          answer: 0,
          explanation: 'CPDA-1 (Citrate Phosphate Dextrose Adenine) provides a shelf-life of 35 days at 2°C to 6°C.'
        },
        {
          q: 'Platelet concentrates must be stored at what temperature under continuous gentle agitation?',
          options: ['20°C to 24°C', '2°C to 6°C', '-18°C', '0°C'],
          answer: 0,
          explanation: 'Platelets are stored at 20°C to 24°C with continuous agitation on a platelet agitator to prevent clumping and preserve function.'
        },
        {
          q: 'What is the maximum storage duration for platelet concentrates?',
          options: ['5 days', '21 days', '35 days', '42 days'],
          answer: 0,
          explanation: 'Because platelets are stored at room temperature (20-24°C), the shelf life is limited to 5 days to reduce bacterial contamination risk.'
        },
        {
          q: 'Fresh Frozen Plasma (FFP) stored at -30°C or colder has a validity period of:',
          options: ['1 year', '35 days', '5 days', '10 years'],
          answer: 0,
          explanation: 'FFP maintains labile coagulation factors (Factor V and VIII) for up to 1 year when kept frozen at -30°C or below.'
        },
        {
          q: 'Cryoprecipitate is especially rich in which coagulation factors?',
          options: ['Factor VIII, Fibrinogen, von Willebrand factor, Factor XIII', 'Factor II, VII, IX, X', 'Albumin and globulin', 'Platelet factor 3'],
          answer: 0,
          explanation: 'Cryoprecipitate contains concentrated Factor VIII, Fibrinogen, vWF, and Factor XIII recovered from cold-insoluble FFP.'
        }
      );
    }

    if (chapterId.includes('ch10') || lowerTitle.includes('fixation') || lowerTitle.includes('fixative') || lowerTitle.includes('formalin')) {
      templates.push(
        {
          q: 'What is the primary aim of tissue fixation in histopathology?',
          options: ['Prevent autolysis and putrefaction while preserving cellular architecture', 'Stain the nuclei blue', 'Remove water from tissue', 'Decompose proteins'],
          answer: 0,
          explanation: 'Fixation terminates metabolic processes, prevents autolysis and bacterial decomposition, and stabilizes tissue morphology.'
        },
        {
          q: 'What is 10% neutral buffered formalin (NBF) made of?',
          options: ['4% formaldehyde in phosphate buffered water', '10% pure formaldehyde gas', '100% formal alcohol', '1% formaldehyde in saline'],
          answer: 0,
          explanation: 'Commercial formalin is a 37-40% aqueous formaldehyde solution; a 10% dilution yields approximately 4% formaldehyde buffered to pH 7.0.'
        },
        {
          q: 'What is the recommended fixative volume to tissue volume ratio?',
          options: ['15:1 to 20:1', '1:1', '2:1', '5:1'],
          answer: 0,
          explanation: 'Proper fixation requires 15 to 20 times the volume of fixative relative to tissue volume.'
        },
        {
          q: 'Bouin’s fluid contains which distinctive yellow crystalline component?',
          options: ['Picric acid', 'Mercuric chloride', 'Chromic acid', 'Osmium tetroxide'],
          answer: 0,
          explanation: 'Bouin’s fluid consists of saturated aqueous picric acid, 40% formalin, and glacial acetic acid.'
        },
        {
          q: 'Which fixative is preferred for fixing testicular biopsy and endocrine tissues?',
          options: ["Bouin's fixative", '10% formalin', 'Absolute alcohol', 'Acetone'],
          answer: 0,
          explanation: "Bouin's fluid preserves delicate morphology and nuclear detail, making it ideal for testicular and GI biopsies."
        },
        {
          q: 'Zenker’s fluid contains mercuric chloride and requires post-treatment with which solution to remove mercury pigment?',
          options: ['Iodine followed by sodium thiosulfate', 'Xylene', 'Absolute alcohol', 'Ammonia water'],
          answer: 0,
          explanation: 'Mercury deposits from Zenker’s or Helly’s fluids are cleared using Lugol’s iodine and bleached with 5% sodium thiosulfate.'
        },
        {
          q: 'Which fixative is recognized as the best choice for electron microscopy ultrastructure preservation?',
          options: ['Glutaraldehyde followed by Osmium tetroxide', '10% Formalin', "Bouin's fluid", "Carnoy's fluid"],
          answer: 0,
          explanation: 'Glutaraldehyde provides excellent protein cross-linking and osmium tetroxide stabilizes membrane lipids for TEM.'
        },
        {
          q: 'Carnoy’s fixative is particularly noted for rapid action and preservation of:',
          options: ['Nucleic acids, glycogen, and chromosome cytology', 'Lipids', 'Red blood cells', 'Bone minerals'],
          answer: 0,
          explanation: 'Carnoy’s fluid (ethanol, chloroform, glacial acetic acid) penetrates rapidly and preserves nuclear chromatin and glycogen.'
        }
      );
    }

    if (chapterId.includes('ch11') || lowerTitle.includes('tissue processing') || lowerTitle.includes('dehydration') || lowerTitle.includes('clearing')) {
      templates.push(
        {
          q: 'What is the correct sequence of steps in standard histological tissue processing?',
          options: ['Dehydration → Clearing → Infiltration / Embedding', 'Clearing → Dehydration → Infiltration', 'Fixation → Infiltration → Dehydration', 'Sectioning → Clearing → Dehydration'],
          answer: 0,
          explanation: 'Tissue processing follows: Dehydration (removing water) → Clearing (solvent miscible with wax) → Infiltration (paraffin wax).'
        },
        {
          q: 'Which alcohol series is standardly used for gradual tissue dehydration?',
          options: ['Ascending grades: 70% → 80% → 90% → Absolute alcohol', 'Descending grades: 100% → 70%', 'Pure acetone directly', '10% formalin series'],
          answer: 0,
          explanation: 'Ascending grades of alcohol prevent excessive shrinkage, distortion, and hardening of tissue.'
        },
        {
          q: 'Why is a clearing agent like Xylene necessary before paraffin infiltration?',
          options: ['Alcohol and paraffin wax are immiscible; Xylene is miscible with both', 'It stains nuclei', 'It decalcifies bone', 'It preserves antigens'],
          answer: 0,
          explanation: 'Paraffin wax will not dissolve in alcohol, so clearing agents miscible with both alcohol and wax are required.'
        },
        {
          q: 'What is the ideal melting point of paraffin wax used for routine histology infiltration and embedding?',
          options: ['56°C to 58°C', '37°C to 40°C', '70°C to 75°C', '90°C'],
          answer: 0,
          explanation: 'Paraffin wax with a melting point of 56°C to 58°C provides optimal consistency for sectioning in temperate climates.'
        },
        {
          q: 'Excessive time in clearing agents like xylene causes the tissue to become:',
          options: ['Brittle, hard, and difficult to section', 'Too soft and swollen', 'Completely dissolved', 'Bleached white'],
          answer: 0,
          explanation: 'Prolonged xylene exposure causes severe tissue hardening and brittleness, producing chatter during microtomy.'
        }
      );
    }

    if (chapterId.includes('ch13') || lowerTitle.includes('decalcification')) {
      templates.push(
        {
          q: 'What is the primary objective of decalcification in histotechnology?',
          options: ['Removal of calcium salts from bone or calcified tissues to allow microtome sectioning', 'Fixing the bone marrow', 'Dehydrating bone tissue', 'Staining osteoblasts'],
          answer: 0,
          explanation: 'Decalcification removes rigid calcium hydroxyapatite crystals so the tissue can be cut without ruining microtome blades.'
        },
        {
          q: 'Which chelating agent is widely used for gentle, enzyme-preserving decalcification?',
          options: ['EDTA (Ethylenediaminetetraacetic acid)', 'Nitric acid', 'Formic acid', 'Sulfuric acid'],
          answer: 0,
          explanation: 'EDTA binds calcium ions slowly and gently without distorting micro-architecture or inactivating enzymes.'
        },
        {
          q: 'What is the most accurate and non-destructive method for determining the end-point of decalcification?',
          options: ['Radiographic (X-ray) examination', 'Needle puncture test', 'Bending and probing with scalpel', 'Smelling the solution'],
          answer: 0,
          explanation: 'X-ray radiography confirms complete removal of radio-opaque calcium deposits without mechanically damaging the specimen.'
        },
        {
          q: 'In the chemical test for decalcification end-point, what reagent is added to neutralize acid before adding ammonium oxalate?',
          options: ['Ammonium hydroxide (neutralizing to pH 7)', 'Hydrochloric acid', 'Glacial acetic acid', 'Xylene'],
          answer: 0,
          explanation: 'Decalcifying fluid is neutralized with dilute ammonia; precipitation of white calcium oxalate indicates residual calcium.'
        }
      );
    }

    if (chapterId.includes('ch14') || lowerTitle.includes('microtomy') || lowerTitle.includes('knife') || lowerTitle.includes('sectioning')) {
      templates.push(
        {
          q: 'What is the routine thickness of paraffin sections cut for diagnostic light microscopy?',
          options: ['3 to 5 microns (µm)', '10 to 15 microns (µm)', '0.5 to 1 micron (µm)', '25 microns (µm)'],
          answer: 0,
          explanation: 'Sections cut at 3–5 µm thickness allow clear single-cell layer evaluation under standard high-power microscopy.'
        },
        {
          q: 'What is the temperature of the floating tissue water bath maintained at during microtomy?',
          options: ['5°C to 10°C below the melting point of paraffin wax (~45°C–50°C)', 'Boiling (100°C)', 'Room temperature (20°C)', '37°C exactly'],
          answer: 0,
          explanation: 'Maintaining water at 45°C–50°C expands tissue ribbons and eliminates wrinkles without melting the wax block.'
        },
        {
          q: 'What is the purpose of Mayer’s egg albumin in microtomy?',
          options: ['Section adhesive to stick tissue firmly to glass slides', 'Tissue clearing agent', 'Nuclear counterstain', 'Knife sharpening compound'],
          answer: 0,
          explanation: 'Mayer’s egg albumin glycerol solution coats glass slides to prevent paraffin sections from detaching during staining.'
        },
        {
          q: 'Parallel thick and thin horizontal lines across a section (chatter/vibration) during microtomy are commonly caused by:',
          options: ['Loose knife/block holder or excessive blade tilt', 'Water bath too warm', 'Over-staining with hematoxylin', 'Paraffin wax too soft'],
          answer: 0,
          explanation: 'Chatter is caused by blade or block holder vibration, excessive knife clearance angle, or over-hardened tissue.'
        },
        {
          q: 'Honing of a microtome knife refers to:',
          options: ['Grinding the cutting edge on a sharpening stone (Belgian black / Arkansas stone)', 'Polishing on a leather strop', 'Coating with oil', 'Heating in an oven'],
          answer: 0,
          explanation: 'Honing sharpens the beveled edge and removes nicks; stropping subsequently polishes the edge on leather.'
        }
      );
    }

    if (chapterId.includes('ch16') || chapterId.includes('ch17') || lowerTitle.includes('haematoxylin') || lowerTitle.includes('h&e') || lowerTitle.includes('staining')) {
      templates.push(
        {
          q: 'Haematoxylin is an active dye only when oxidized into which active coloring compound?',
          options: ['Haematein', 'Eosin Y', 'Hemozoin', 'Hematoidin'],
          answer: 0,
          explanation: 'Haematoxylin itself has no staining properties until oxidized (ripened) chemically or naturally into haematein.'
        },
        {
          q: 'In Mayer’s haematoxylin, which chemical agent is used for instantaneous chemical ripening?',
          options: ['Sodium iodate', 'Mercuric oxide', 'Potassium permanganate', 'Hydrogen peroxide'],
          answer: 0,
          explanation: 'Mayer’s haematoxylin uses sodium iodate as an oxidizing agent for immediate ripening.'
        },
        {
          q: 'What mordant is present in both Mayer’s and Harris haematoxylin solutions?',
          options: ['Potassium or ammonium alum (Aluminium salts)', 'Ferric chloride', 'Phosphotungstic acid', 'Lead nitrate'],
          answer: 0,
          explanation: 'Alum haematoxylins use aluminium ions as a mordant to bind anionic phosphate groups of nuclear chromatin.'
        },
        {
          q: 'What is the purpose of "bluing" after haematoxylin staining and acid alcohol differentiation?',
          options: ['Converting reddish-purple aluminium-haematein into an insoluble blue lake in alkaline pH', 'Staining collagen pink', 'Clearing the slide in xylene', 'Removing excess paraffin'],
          answer: 0,
          explanation: 'Mild alkaline solutions (Scott tap water, dilute ammonia, lithium carbonate) change the pH to turn haematoxylin lake blue.'
        },
        {
          q: 'Eosin Y counterstain in routine H&E stains which cellular structures?',
          options: ['Cytoplasm, muscle fibers, collagen, and RBCs in shades of pink/red', 'Cell nuclei blue', 'Mucin purple', 'DNA black'],
          answer: 0,
          explanation: 'Eosin is an acidic xanthene dye that binds cationic basic groups in cytoplasm, collagen, and erythrocytes.'
        },
        {
          q: 'What is DPX composed of in histopathology mounting?',
          options: ['Distrene, Dibutylphthalate (plasticizer), and Xylene', 'Dimethylformamide and paraffin', 'Dextrose and peptone', 'Diethylene glycol and xylene'],
          answer: 0,
          explanation: 'DPX consists of Distrene 80 (synthetic resin), Plasticizer (dibutylphthalate), and Xylene as solvent.'
        }
      );
    }

    if (chapterId.includes('ch18') || chapterId.includes('ch19') || chapterId.includes('ch20') || lowerTitle.includes('special stain') || lowerTitle.includes('pas') || lowerTitle.includes('congo red')) {
      templates.push(
        {
          q: 'What is the oxidizing agent used in Periodic Acid-Schiff (PAS) staining?',
          options: ['Periodic acid', 'Schiff reagent', 'Chromic acid', 'Picric acid'],
          answer: 0,
          explanation: 'Periodic acid oxidizes 1,2-glycol groups in carbohydrates into dialdehydes, which react with Schiff reagent.'
        },
        {
          q: 'Which enzyme is used in diastase-PAS staining to confirm the presence of glycogen?',
          options: ['Diastase (or salivary alpha-amylase)', 'Pepsin', 'Trypsin', 'Lipase'],
          answer: 0,
          explanation: 'Diastase digests glycogen; disappearance of PAS positivity on the digested slide confirms glycogen.'
        },
        {
          q: 'What is the diagnostic hallmark of amyloid when stained with Congo Red under polarizing microscopy?',
          options: ['Apple-green birefringence', 'Bright yellow fluorescence', 'Blue metachromasia', 'Jet black crystals'],
          answer: 0,
          explanation: 'Congo Red molecules align with the beta-pleated sheet of amyloid, displaying characteristic apple-green birefringence.'
        },
        {
          q: 'Masson’s trichrome stain typically stains collagen fibers in which color?',
          options: ['Green (Light Green) or Blue (Aniline Blue)', 'Bright red', 'Yellow', 'Black'],
          answer: 0,
          explanation: 'Masson’s trichrome stains collagen green or blue, muscle fibers red, and nuclei black.'
        },
        {
          q: 'Which special stain is specifically used to demonstrate iron (ferric iron / hemosiderin) deposits?',
          options: ["Perls' Prussian blue reaction", 'Alcian Blue', 'Masson Fontana', 'Sudan Black B'],
          answer: 0,
          explanation: "Perls' reaction uses potassium ferrocyanide in dilute HCl to form ferric ferrocyanide (Prussian blue)."
        },
        {
          q: 'Which silver stain is the gold standard for visualizing fungal walls and Pneumocystis jirovecii in tissue sections?',
          options: ["Grocott's Methenamine Silver (GMS)", 'Gram stain', 'Mucicarmine', 'Oil Red O'],
          answer: 0,
          explanation: 'GMS stains fungal cell wall mucopolysaccharides black with a green light-green counterstain background.'
        },
        {
          q: 'Which stain is used to detect lipid droplets in frozen sections?',
          options: ['Oil Red O or Sudan Black B', 'Periodic Acid-Schiff', 'Ziehl-Neelsen', 'Von Kossa'],
          answer: 0,
          explanation: 'Neutral fats and lipids are demonstrated in cryostat sections using lysochrome dyes like Oil Red O and Sudan Black B.'
        }
      );
    }

    if (chapterId.includes('ch23') || chapterId.includes('ch24') || chapterId.includes('ch25') || lowerTitle.includes('cytology') || lowerTitle.includes('pap') || lowerTitle.includes('fnac')) {
      templates.push(
        {
          q: 'What is the standard fixative for routine diagnostic Papanicolaou (PAP) smears?',
          options: ['95% ethyl alcohol (or ether-alcohol mixture)', '10% formalin', 'Absolute acetone', 'Normal saline'],
          answer: 0,
          explanation: 'Wet fixation in 95% ethanol immediately prevents air-drying artefact in PAP cytology smears.'
        },
        {
          q: 'What are the two cytoplasmic counterstains used in the Papanicolaou staining method?',
          options: ['OG-6 (Orange G) and EA-36 / EA-50', 'Eosin and Methylene blue', 'Giemsa and Leishman', 'Crystal violet and Safranin'],
          answer: 0,
          explanation: 'PAP stain uses OG-6 for keratinized cells and EA (Eosin, Light Green, Bismarck Brown) for superficial and intermediate cells.'
        },
        {
          q: 'In cervical Pap smears, mature superficial squamous cells stain:',
          options: ['Pink to orange (eosinophilic / orangeophilic)', 'Cyanophilic (blue-green)', 'Black', 'Bright purple'],
          answer: 0,
          explanation: 'Keratinized and mature superficial cells stain pink or orange with OG-6/Eosin; intermediate cells stain blue-green.'
        },
        {
          q: 'What needle gauge is commonly used for standard Fine Needle Aspiration Cytology (FNAC)?',
          options: ['22 to 24 Gauge', '16 Gauge', '18 Gauge', '30 Gauge'],
          answer: 0,
          explanation: '22 to 24 gauge needles offer the ideal compromise between adequate cellular yield and minimal hemorrhagic contamination.'
        },
        {
          q: 'Which Romanowsky stain is standardly used for air-dried cytology aspirate smears?',
          options: ['May-Grünwald-Giemsa (MGG) or Leishman stain', 'Papanicolaou stain', 'H&E', 'Alcian blue'],
          answer: 0,
          explanation: 'MGG is performed on rapidly air-dried smears, providing excellent nuclear-cytoplasmic contrast and background matrix detail.'
        },
        {
          q: 'What is the primary advantage of Liquid-Based Cytology (LBC) over conventional smears?',
          options: ['Uniform thin-layer cell distribution with removal of obscuring blood and mucus', 'Takes zero preparation time', 'Requires no staining dyes', 'Never requires a microscope'],
          answer: 0,
          explanation: 'LBC filters debris, blood, and mucus, dispersing cells evenly in a thin monolayer and reducing unsatisfactory smear rates.'
        }
      );
    }
  }

  // MICROBIOLOGY DOMAINS
  if (paperId === 'microbiology') {
    if (chapterId.includes('ch1') || lowerTitle.includes('immunity') || lowerTitle.includes('complement') || lowerTitle.includes('hypersensitivity') || lowerTitle.includes('vaccine')) {
      templates.push(
        {
          q: 'Anaphylaxis and allergic bronchial asthma are classic examples of which hypersensitivity reaction?',
          options: ['Type I Hypersensitivity (Immediate / IgE-mediated)', 'Type II (Cytotoxic)', 'Type III (Immune complex)', 'Type IV (Delayed-type)'],
          answer: 0,
          explanation: 'Type I hypersensitivity involves allergen cross-linking IgE on mast cells, triggering histamine degranulation.'
        },
        {
          q: 'Which pathway of the complement system is activated directly by antigen-antibody (IgM or IgG) complexes?',
          options: ['Classical pathway', 'Alternative pathway', 'Lectin pathway', 'Properdin pathway'],
          answer: 0,
          explanation: 'The classical pathway is triggered when C1q binds to the Fc portion of complexed IgM or IgG.'
        },
        {
          q: 'Which component represents the central junction and key amplifying enzyme of all complement pathways?',
          options: ['C3 convertase', 'C1 esterase', 'C9 polymer', 'Factor D'],
          answer: 0,
          explanation: 'All three complement activation pathways converge at the generation of C3 convertase to cleave C3 into C3a and C3b.'
        },
        {
          q: 'The tuberculin (Mantoux) test reaction is mediated by which mechanism?',
          options: ['Type IV Delayed-Type Hypersensitivity (cell-mediated by T cells)', 'Type I IgE response', 'Type II antibody cytotoxicity', 'Arthus reaction'],
          answer: 0,
          explanation: 'Mantoux reaction is a classic Type IV hypersensitivity mediated by sensitized CD4+ Th1 cells releasing cytokines.'
        },
        {
          q: 'Administration of anti-tetanus serum (ATS) or anti-rabies immunoglobulin provides:',
          options: ['Artificial passive immunity', 'Natural active immunity', 'Artificial active immunity', 'Innate non-specific immunity'],
          answer: 0,
          explanation: 'Preformed antibodies administered to a recipient confer immediate, short-lived artificial passive immunity.'
        },
        {
          q: 'Which vaccine is a live attenuated bacterial vaccine?',
          options: ['BCG (Bacillus Calmette-Guérin)', 'Tetanus toxoid', 'Hepatitis B vaccine', 'Rabies vaccine'],
          answer: 0,
          explanation: 'BCG is a live attenuated strain of Mycobacterium bovis used to protect against tuberculosis.'
        },
        {
          q: 'What is the major immunoglobulin found in mucosal secretions, saliva, colostrum, and tears?',
          options: ['Secretory IgA', 'IgG', 'IgM', 'IgE'],
          answer: 0,
          explanation: 'Dimeric secretory IgA provides primary immune defense across external mucosal surfaces.'
        }
      );
    }

    if (chapterId.includes('ch2') || chapterId.includes('ch3') || chapterId.includes('ch4') || lowerTitle.includes('parasit') || lowerTitle.includes('entamoeba') || lowerTitle.includes('malaria') || lowerTitle.includes('helminth')) {
      templates.push(
        {
          q: 'How many nuclei are characteristically seen in a mature, infective cyst of Entamoeba histolytica?',
          options: ['4 nuclei (quadrinucleate cyst)', '1 nucleus', '2 nuclei', '8 nuclei'],
          answer: 0,
          explanation: 'The mature infective cyst of Entamoeba histolytica contains 4 nuclei and blunt-ended chromatoid bars.'
        },
        {
          q: 'The presence of ingested red blood cells (erythrophagocytosis) in a motile trophozoite is diagnostic of:',
          options: ['Entamoeba histolytica', 'Entamoeba coli', 'Giardia lamblia', 'Balantidium coli'],
          answer: 0,
          explanation: 'Trophozoites of pathogenic Entamoeba histolytica actively ingest RBCs in tissue invasive amoebiasis.'
        },
        {
          q: 'Falling-leaf motility in saline wet mount stool examination is characteristic of:',
          options: ['Giardia lamblia trophozoites', 'Trichomonas vaginalis', 'Entamoeba histolytica', 'Vibrio cholerae'],
          answer: 0,
          explanation: 'Flagellated pear-shaped Giardia lamblia trophozoites display classic "falling-leaf" motility.'
        },
        {
          q: 'What is the definitive host of Plasmodium parasites causing human malaria?',
          options: ['Female Anopheles mosquito', 'Male Anopheles mosquito', 'Human being', 'Culex mosquito'],
          answer: 0,
          explanation: 'The female Anopheles mosquito is the definitive host because sexual reproduction (sporogony) takes place in it.'
        },
        {
          q: 'Crescent or banana-shaped gametocytes in peripheral blood smear are diagnostic of:',
          options: ['Plasmodium falciparum', 'Plasmodium vivax', 'Plasmodium malariae', 'Plasmodium ovale'],
          answer: 0,
          explanation: 'P. falciparum characteristically forms crescentic, banana-shaped gametocytes in peripheral blood.'
        },
        {
          q: 'Leishman-Donovan (LD) bodies demonstrated in bone marrow or splenic aspirates represent which morphological form?',
          options: ['Amastigote form', 'Promastigote form', 'Epimastigote form', 'Trypomastigote form'],
          answer: 0,
          explanation: 'LD bodies are intracellular amastigotes of Leishmania donovani inside reticuloendothelial macrophages.'
        },
        {
          q: 'What is the intermediate host of Taenia solium (pork tapeworm)?',
          options: ['Pig (swine)', 'Cow (cattle)', 'Sheep', 'Snail'],
          answer: 0,
          explanation: 'Pig is the intermediate host harboring Cysticercus cellulosae, while humans are definitive hosts.'
        },
        {
          q: 'Which helminth egg has distinctive bipolar plugs and a barrel shape?',
          options: ['Trichuris trichiura (whipworm)', 'Ascaris lumbricoides', 'Enterobius vermicularis', 'Ancylostoma duodenale'],
          answer: 0,
          explanation: 'Trichuris trichiura eggs are barrel-shaped with clear mucoid bipolar plugs.'
        },
        {
          q: 'D-shaped (plano-convex) eggs collected via cellophane tape (NIH swab) from the perianal region indicate:',
          options: ['Enterobius vermicularis (pinworm / threadworm)', 'Ascaris lumbricoides', 'Taenia saginata', 'Strongyloides'],
          answer: 0,
          explanation: 'Female Enterobius migrates to the perianal skin to deposit characteristic asymmetric plano-convex eggs.'
        },
        {
          q: 'Nocturnal periodicity in peripheral blood collection (10 PM to 2 AM) is required to detect microfilariae of:',
          options: ['Wuchereria bancrofti', 'Loa loa', 'Onchocerca volvulus', 'Mansonella perstans'],
          answer: 0,
          explanation: 'Microfilariae of Wuchereria bancrofti appear in highest concentration in peripheral blood at night.'
        }
      );
    }

    if (chapterId.includes('ch5') || chapterId.includes('ch6') || chapterId.includes('ch7') || lowerTitle.includes('virology') || lowerTitle.includes('hepatitis') || lowerTitle.includes('hiv') || lowerTitle.includes('virus')) {
      templates.push(
        {
          q: 'Which hepatitis virus is a DNA virus belonging to the Hepadnaviridae family?',
          options: ['Hepatitis B virus (HBV)', 'Hepatitis A virus (HAV)', 'Hepatitis C virus (HCV)', 'Hepatitis E virus (HEV)'],
          answer: 0,
          explanation: 'HBV is the only DNA hepatitis virus; HAV, HCV, HDV, and HEV are all RNA viruses.'
        },
        {
          q: 'What is the first serological marker to appear in the serum of an HBV-infected individual?',
          options: ['HBsAg (Australia antigen)', 'Anti-HBs', 'HBeAg', 'Anti-HBc IgM'],
          answer: 0,
          explanation: 'HBsAg is detectable in blood 2 to 6 weeks before symptoms and indicates active infection.'
        },
        {
          q: 'The presence of which antibody indicates successful immunization against Hepatitis B?',
          options: ['Anti-HBs (alone, without Anti-HBc)', 'Anti-HBc IgM', 'Anti-HBe', 'HBsAg'],
          answer: 0,
          explanation: 'Isolated anti-HBs IgG develops after recombinant hepatitis B vaccination, conferring long-term protection.'
        },
        {
          q: 'Which envelope glycoprotein of HIV binds specifically to the CD4 receptor on helper T cells?',
          options: ['gp120', 'gp41', 'p24', 'Reverse transcriptase'],
          answer: 0,
          explanation: 'HIV surface glycoprotein gp120 attaches to the host CD4 molecule, assisted by chemokine coreceptors (CCR5/CXCR4).'
        },
        {
          q: 'Negri bodies in neuronal cytoplasm on Seller’s stain are pathognomonic of:',
          options: ['Rabies', 'Poliomyelitis', 'Herpes simplex encephalitis', 'Measles'],
          answer: 0,
          explanation: 'Negri bodies are eosinophilic intracytoplasmic inclusions found in Ammon’s horn of hippocampus and Purkinje cells in rabies.'
        },
        {
          q: 'Which diagnostic test detects acute dengue virus infection on Day 1 to 5 of fever before antibodies form?',
          options: ['Dengue NS1 Antigen ELISA / ICT', 'Dengue IgG ELISA', 'Widal test', 'VDRL test'],
          answer: 0,
          explanation: 'NS1 non-structural protein antigen is secreted into bloodstream during early acute viremia in dengue.'
        }
      );
    }

    if (chapterId.includes('ch9') || chapterId.includes('ch10') || lowerTitle.includes('mycology') || lowerTitle.includes('fungi') || lowerTitle.includes('candida')) {
      templates.push(
        {
          q: 'What is the role of 10% to 20% potassium hydroxide (KOH) in fungal wet mount preparations?',
          options: ['Clears and dissolves host keratin and cellular debris to highlight fungal hyphae', 'Stains fungal cell walls blue', 'Acts as a nutrient culture media', 'Kills bacteria exclusively'],
          answer: 0,
          explanation: 'KOH dissolves background keratinous tissue (skin, hair, nails) without damaging chitinous fungal walls.'
        },
        {
          q: 'What is the standard culture medium used for routine fungal isolation in the laboratory?',
          options: ["Sabouraud Dextrose Agar (SDA) at pH 5.6", "MacConkey Agar", "Blood Agar at pH 8.0", "Lowenstein-Jensen medium"],
          answer: 0,
          explanation: 'SDA with its acidic pH (5.6) and high dextrose content inhibits bacteria while encouraging fungal growth.'
        },
        {
          q: 'Which rapid presumptive test distinguishes Candida albicans from other Candida species within 2 hours in human serum at 37°C?',
          options: ['Germ tube test (Reynolds-Braude phenomenon)', 'Urease test', 'Sugar fermentation test', 'Coagulase test'],
          answer: 0,
          explanation: 'Candida albicans sprouts a true germ tube without constriction at the mother blastoconidium within 2–3 hours.'
        },
        {
          q: 'India ink or Nigrosin negative staining of CSF is classically used to detect:',
          options: ['Cryptococcus neoformans encapsulated yeast', 'Candida albicans', 'Aspergillus fumigatus', 'Histoplasma capsulatum'],
          answer: 0,
          explanation: 'The wide mucopolysaccharide capsule of Cryptococcus neoformans excludes ink particles, showing a clear halo.'
        },
        {
          q: 'What stain is routinely used to prepare slide mounts from fungal colonies?',
          options: ['Lactophenol Cotton Blue (LCB)', 'Gram stain', 'Leishman stain', 'Field stain'],
          answer: 0,
          explanation: 'LCB contains phenol (kills fungus), lactic acid (preserves structures), and cotton blue (stains chitin).'
        }
      );
    }

    if (chapterId.includes('ch11') || chapterId.includes('ch12') || lowerTitle.includes('widal') || lowerTitle.includes('vdrl') || lowerTitle.includes('skin test') || lowerTitle.includes('elisa') || lowerTitle.includes('mantoux')) {
      templates.push(
        {
          q: 'In the Widal tube agglutination test, a rising titer of which antibodies is diagnostic of enteric (typhoid) fever?',
          options: ['Anti-O (somatic) and Anti-H (flagellar) antibodies against Salmonella', 'Anti-Vi antibodies alone', 'Heterophile antibodies', 'Cold agglutinins'],
          answer: 0,
          explanation: 'Widal test measures antibodies against Salmonella Typhi O and H antigens and S. Paratyphi AH and BH antigens.'
        },
        {
          q: 'The VDRL test for syphilis uses an antigen composed of:',
          options: ['Cardiolipin, lecithin, and cholesterol', 'Treponema pallidum live spirochetes', 'Sheep red blood cells', 'Streptococcal hemolysin'],
          answer: 0,
          explanation: 'VDRL is a non-treponemal flocculation test using cardiolipin, cholesterol, and lecithin.'
        },
        {
          q: 'What type of antigen-antibody reaction occurs in the VDRL test?',
          options: ['Microscopic slide flocculation', 'Tube hemagglutination', 'Complement fixation', 'Gel precipitation'],
          answer: 0,
          explanation: 'VDRL utilizes a slide flocculation reaction read under low power (10x) light microscopy.'
        },
        {
          q: 'The Mantoux tuberculin test is read after how many hours following intradermal PPD injection?',
          options: ['48 to 72 hours', '12 to 24 hours', '1 to 2 hours', '1 week'],
          answer: 0,
          explanation: 'Mantoux reaction is a delayed-type hypersensitivity measured by transverse diameter of induration at 48–72 hours.'
        },
        {
          q: 'Casoni’s intradermal skin test was historically used to aid diagnosis of:',
          options: ['Hydatid cyst disease (Echinococcus granulosus)', 'Tuberculosis', 'Leprosy', 'Syphilis'],
          answer: 0,
          explanation: 'Casoni’s test introduced sterile hydatid fluid intradermally to produce an immediate wheal-and-flare reaction.'
        },
        {
          q: 'In an indirect ELISA, what is the enzyme-conjugated reagent that is added in the second incubation step?',
          options: ['Enzyme-labeled anti-human immunoglobulin antibody', 'Unlabeled patient serum', 'Substrate chromogen mixture', 'Coating antigen'],
          answer: 0,
          explanation: 'Indirect ELISA uses an anti-human globulin secondary antibody linked to horseradish peroxidase (HRP) or alkaline phosphatase.'
        }
      );
    }
  }

  // BIOCHEMISTRY DOMAINS
  if (paperId === 'biochemistry') {
    if (chapterId.includes('ch1') || chapterId.includes('ch2') || lowerTitle.includes('glucose') || lowerTitle.includes('diabetes') || lowerTitle.includes('hba1c')) {
      templates.push(
        {
          q: 'What is the principal enzymatic method used for routine blood glucose estimation?',
          options: ['GOD-POD (Glucose Oxidase - Peroxidase) method', 'Hexokinase method', 'Folin-Wu copper reduction method', 'Nelson-Somogyi method'],
          answer: 0,
          explanation: 'GOD oxidizes glucose to gluconic acid and H2O2; POD then couples H2O2 with 4-aminophenazone to form a red quinoneimine dye.'
        },
        {
          q: 'What is the normal fasting plasma glucose reference range in a healthy adult according to ADA guidelines?',
          options: ['70 to 99 mg/dL', '126 to 140 mg/dL', '140 to 200 mg/dL', '40 to 60 mg/dL'],
          answer: 0,
          explanation: 'Normal fasting plasma glucose is 70–99 mg/dL; 100–125 mg/dL is impaired fasting glucose; ≥126 mg/dL indicates diabetes.'
        },
        {
          q: 'Which anticoagulant/glycolysis inhibitor combination is used in the gray-top vacutainer tube for blood glucose estimation?',
          options: ['Sodium fluoride with potassium oxalate', 'K2 EDTA', 'Sodium heparin', 'Trisodium citrate'],
          answer: 0,
          explanation: 'Sodium fluoride inhibits enolase enzyme to arrest glycolysis, preserving blood glucose concentration.'
        },
        {
          q: 'Glycated hemoglobin (HbA1c) reflects the average blood glucose level over what period?',
          options: ['Past 2 to 3 months (8 to 12 weeks)', 'Past 24 hours', 'Past 1 to 2 weeks', 'Past 1 year'],
          answer: 0,
          explanation: 'HbA1c is formed by non-enzymatic glycation of hemoglobin and reflects the lifespan of red blood cells (approx. 120 days).'
        },
        {
          q: 'An HbA1c level of what percentage is diagnostic for Diabetes Mellitus as per ADA criteria?',
          options: ['≥ 6.5%', '≥ 5.7%', '≥ 4.5%', '≥ 8.0%'],
          answer: 0,
          explanation: 'An HbA1c value ≥ 6.5% on standard certified assay confirms diabetes mellitus.'
        },
        {
          q: 'In an Oral Glucose Tolerance Test (OGTT) for non-pregnant adults, what glucose load is administered?',
          options: ['75 grams of anhydrous glucose dissolved in water', '50 grams', '100 grams', '25 grams'],
          answer: 0,
          explanation: 'The standard WHO/ADA diagnostic OGTT requires ingestion of 75 grams of anhydrous glucose in 250–300 mL water.'
        },
        {
          q: 'Which hormone is the ONLY major hypoglycemic hormone that lowers blood glucose levels?',
          options: ['Insulin', 'Glucagon', 'Cortisol', 'Epinephrine'],
          answer: 0,
          explanation: 'Insulin produced by pancreatic beta cells is the sole physiological hormone that directly lowers blood glucose.'
        }
      );
    }

    if (chapterId.includes('ch3') || lowerTitle.includes('lipoprotein') || lowerTitle.includes('cholesterol') || lowerTitle.includes('lipid')) {
      templates.push(
        {
          q: 'Which lipoprotein is responsible for "reverse cholesterol transport" from peripheral tissues to the liver?',
          options: ['HDL (High-Density Lipoprotein)', 'LDL (Low-Density Lipoprotein)', 'VLDL (Very Low-Density Lipoprotein)', 'Chylomicrons'],
          answer: 0,
          explanation: 'HDL picks up excess cholesterol from cells and returns it to the liver for excretion as bile acids.'
        },
        {
          q: 'Which lipoprotein is considered the primary atherogenic "bad cholesterol"?',
          options: ['LDL', 'HDL', 'Chylomicrons', 'Albumin'],
          answer: 0,
          explanation: 'Elevated LDL penetrates vascular endothelium, undergoes oxidation, and forms atherosclerotic plaques.'
        },
        {
          q: 'According to the Friedewald formula, how is LDL cholesterol calculated if triglycerides are < 400 mg/dL?',
          options: ['LDL = Total Cholesterol - [HDL + (Triglycerides / 5)]', 'LDL = Total Cholesterol + HDL', 'LDL = Triglycerides - (HDL / 5)', 'LDL = Total Cholesterol / 2'],
          answer: 0,
          explanation: 'Friedewald formula: LDL = Total Cholesterol - HDL - (TG / 5). VLDL is estimated as TG / 5.'
        },
        {
          q: 'What is the minimum fasting duration recommended prior to blood collection for a complete lipid profile?',
          options: ['10 to 12 hours fasting', '2 hours fasting', '24 hours fasting', 'No fasting required'],
          answer: 0,
          explanation: 'A 10–12 hour fast ensures clearance of dietary chylomicrons for accurate baseline triglyceride measurement.'
        },
        {
          q: 'The CHOD-PAP enzymatic method is used in the laboratory to determine:',
          options: ['Total serum cholesterol', 'Serum bilirubin', 'Serum creatinine', 'Blood urea nitrogen'],
          answer: 0,
          explanation: 'CHOD-PAP utilizes Cholesterol Esterase, Cholesterol Oxidase (CHOD), and Peroxidase (PAP).'
        }
      );
    }

    if (chapterId.includes('ch4') || lowerTitle.includes('liver') || lowerTitle.includes('lft') || lowerTitle.includes('bilirubin')) {
      templates.push(
        {
          q: 'Which chemical reagent is used in the classic van den Bergh reaction for bilirubin estimation?',
          options: ['Diazo reagent (Sulfanilic acid + Sodium nitrite)', 'Biuret reagent', 'Berthelot reagent', "Jaffe's picric acid"],
          answer: 0,
          explanation: 'Van den Bergh reaction couples bilirubin with diazotized sulfanilic acid to form pink azobilirubin.'
        },
        {
          q: 'In the van den Bergh reaction, conjugated (direct) bilirubin reacts:',
          options: ['Immediately without adding an accelerator (direct positive)', 'Only after adding alcohol / caffeine', 'Never reacts with diazo reagent', 'Forms a black precipitate'],
          answer: 0,
          explanation: 'Conjugated bilirubin is water-soluble and reacts directly; unconjugated requires caffeine-benzoate or alcohol.'
        },
        {
          q: 'Which liver enzyme is most specific for hepatocellular injury because it is primarily located in liver cytoplasm?',
          options: ['ALT (Alanine transaminase / SGPT)', 'AST (Aspartate transaminase / SGOT)', 'Alkaline Phosphatase (ALP)', 'Amylase'],
          answer: 0,
          explanation: 'ALT is primarily localized in hepatocytes, whereas AST is present in high amounts in heart and muscle.'
        },
        {
          q: 'A disproportionate marked elevation of Alkaline Phosphatase (ALP) and GGT with high direct bilirubin indicates:',
          options: ['Obstructive / Cholestatic jaundice', 'Hemolytic jaundice', 'Gilbert syndrome', 'Crigler-Najjar syndrome'],
          answer: 0,
          explanation: 'Biliary canalicular enzymes ALP and GGT rise sharply in extrahepatic or intrahepatic biliary obstruction.'
        },
        {
          q: 'What is the normal reference range for Total Serum Bilirubin in adults?',
          options: ['0.2 to 1.2 mg/dL', '3.0 to 5.0 mg/dL', '10.0 to 15.0 mg/dL', '20 mg/dL'],
          answer: 0,
          explanation: 'Normal total serum bilirubin is 0.2 to 1.2 mg/dL, with direct bilirubin typically < 0.3 mg/dL.'
        },
        {
          q: 'What is the standard method used for total serum protein estimation in clinical chemistry?',
          options: ['Biuret method (alkaline copper tartrate)', 'Bromocresol Green (BCG)', 'Folin-Ciocalteu reagent', 'Nesslerization'],
          answer: 0,
          explanation: 'Biuret reaction detects peptide bonds reacting with cupric ions in alkaline medium to form a purple coordination complex.'
        },
        {
          q: 'Bromocresol Green (BCG) dye-binding method is specifically used to measure:',
          options: ['Serum Albumin', 'Serum Globulin', 'Serum Fibrinogen', 'Total Protein'],
          answer: 0,
          explanation: 'At pH 4.2, albumin binds BCG selectively, turning yellow dye into green measured at 630 nm.'
        }
      );
    }

    if (chapterId.includes('ch5') || lowerTitle.includes('renal') || lowerTitle.includes('rft') || lowerTitle.includes('creatinine') || lowerTitle.includes('urea')) {
      templates.push(
        {
          q: 'What is the principle of Jaffe’s reaction used for serum creatinine estimation?',
          options: ['Creatinine reacts with alkaline picrate to produce an orange-red tautomer', 'Enzymatic oxidation with uricase', 'Colorimetric coupling with diazotized sulfanilic acid', 'Urease cleavage to ammonia'],
          answer: 0,
          explanation: 'In alkaline medium, creatinine reacts with picric acid to form an orange-red creatinine-picrate complex measured at 505 nm.'
        },
        {
          q: 'What is the normal serum creatinine reference range in a healthy adult male?',
          options: ['0.7 to 1.4 mg/dL', '2.5 to 5.0 mg/dL', '10 to 20 mg/dL', '0.1 to 0.4 mg/dL'],
          answer: 0,
          explanation: 'Serum creatinine normally ranges from 0.7 to 1.4 mg/dL in males (0.6 to 1.2 mg/dL in females).'
        },
        {
          q: 'In the Berthelot reaction for urea estimation, urease hydrolyzes urea into ammonia and:',
          options: ['Carbon dioxide', 'Glucose', 'Uric acid', 'Formic acid'],
          answer: 0,
          explanation: 'Urease breaks urea into ammonia and CO2; ammonia reacts with hypochlorite and phenol/salicylate to form indophenol blue.'
        },
        {
          q: 'Uric acid is the final metabolic end product of the breakdown of:',
          options: ['Purines (Adenine and Guanine)', 'Pyrimidines', 'Amino acids', 'Cholesterol'],
          answer: 0,
          explanation: 'Uric acid is the end-product of purine nucleotide catabolism; elevation leads to hyperuricemia and gout.'
        },
        {
          q: 'What is the classic chemical preservative used to prevent bacterial decomposition in a 24-hour urine collection for protein/creatinine?',
          options: ['Thymol or Toluene (or Boric acid)', '10% Formalin', 'Xylene', 'Sulfuric acid 50%'],
          answer: 0,
          explanation: 'Thymol or toluene preserves chemical constituents without interfering with routine clinical chemistry tests.'
        },
        {
          q: 'Creatinine clearance test is used clinically to assess which renal parameter?',
          options: ['Glomerular Filtration Rate (GFR)', 'Tubular reabsorption of sodium', 'Renal blood flow volume', 'Urine concentration capacity'],
          answer: 0,
          explanation: 'Because creatinine is freely filtered and minimally secreted by tubules, clearance provides a reliable estimate of GFR.'
        }
      );
    }

    if (chapterId.includes('ch6') || lowerTitle.includes('thyroid') || lowerTitle.includes('tft') || lowerTitle.includes('tsh')) {
      templates.push(
        {
          q: 'Which thyroid hormone is the most active, biologically potent form at the cellular receptor level?',
          options: ['T3 (Triiodothyronine)', 'T4 (Thyroxine)', 'Reverse T3', 'Thyroglobulin'],
          answer: 0,
          explanation: 'Although T4 is secreted in greater quantity, T3 possesses 4–5 times higher biological activity.'
        },
        {
          q: 'In primary hypothyroidism (Hashimoto’s thyroiditis / thyroid failure), what is the typical hormonal pattern?',
          options: ['Elevated TSH with low Free T4 / T3', 'Low TSH with high Free T4', 'Normal TSH with high T3', 'Both TSH and T4 are elevated'],
          answer: 0,
          explanation: 'Loss of thyroid hormone negative feedback on pituitary thyrotrophs leads to marked compensatory elevation of TSH.'
        },
        {
          q: 'Which parameter serves as the single most sensitive initial screening test for primary thyroid disorders?',
          options: ['Serum TSH (Thyroid Stimulating Hormone)', 'Total T4', 'Serum Calcitonin', 'Thyroid Binding Globulin'],
          answer: 0,
          explanation: 'Third-generation chemiluminescent TSH assays detect minute deviations in thyroid homeostasis.'
        }
      );
    }

    if (chapterId.includes('ch8') || lowerTitle.includes('pancreatic') || lowerTitle.includes('amylase') || lowerTitle.includes('lipase')) {
      templates.push(
        {
          q: 'Which serum enzyme is more specific for acute pancreatitis and remains elevated longer in serum?',
          options: ['Serum Lipase', 'Serum Amylase', 'Serum Alkaline Phosphatase', 'Serum ALT'],
          answer: 0,
          explanation: 'Lipase is synthesized almost exclusively by pancreatic acinar cells and remains elevated for 7–14 days.'
        },
        {
          q: 'Serum amylase levels in acute pancreatitis typically begin to rise within how many hours after onset?',
          options: ['2 to 12 hours', '24 to 48 hours', '5 to 7 days', '3 weeks'],
          answer: 0,
          explanation: 'Serum amylase rises quickly within 2–12 hours, peaks at 24 hours, and returns to baseline in 3–5 days.'
        }
      );
    }

    if (chapterId.includes('ch9') || lowerTitle.includes('csf')) {
      templates.push(
        {
          q: 'What is the normal ratio of CSF glucose to plasma glucose in a healthy individual?',
          options: ['Approximately 60% (0.6) of concurrent blood glucose (45–80 mg/dL)', 'Equal to blood glucose (100%)', '10% of blood glucose', 'Twice the blood glucose'],
          answer: 0,
          explanation: 'Normal CSF glucose is roughly 60% of fasting plasma glucose (normally 45–80 mg/dL).'
        },
        {
          q: 'A markedly reduced CSF glucose level (< 40 mg/dL) with high protein and neutrophilic pleocytosis is indicative of:',
          options: ['Acute bacterial (pyogenic) meningitis', 'Viral aseptic meningitis', 'Normal aging', 'Subdural hematoma'],
          answer: 0,
          explanation: 'Bacteria and leukocytes consume glucose in pyogenic meningitis, driving CSF glucose sharply downward.'
        },
        {
          q: 'The Pandy test performed on CSF detects elevated levels of:',
          options: ['Globulins (proteins)', 'Glucose', 'Chloride', 'Bilirubin'],
          answer: 0,
          explanation: 'Pandy reagent (saturated aqueous phenol) forms a cloudy precipitate with abnormally increased CSF globulins.'
        }
      );
    }

    if (chapterId.includes('ch10') || lowerTitle.includes('electrolyte') || lowerTitle.includes('sodium') || lowerTitle.includes('potassium')) {
      templates.push(
        {
          q: 'Which cation is the primary extracellular electrolyte responsible for maintaining plasma osmolality?',
          options: ['Sodium (Na+)', 'Potassium (K+)', 'Calcium (Ca2+)', 'Magnesium (Mg2+)'],
          answer: 0,
          explanation: 'Sodium is the major extracellular cation (normal 135–145 mEq/L) and chief determinant of ECF osmolarity.'
        },
        {
          q: 'What is the normal serum potassium (K+) reference range in adults?',
          options: ['3.5 to 5.0 mEq/L (mmol/L)', '135 to 145 mEq/L', '98 to 108 mEq/L', '8.5 to 10.5 mEq/L'],
          answer: 0,
          explanation: 'Serum potassium is tightly regulated between 3.5 and 5.0 mEq/L; deviations cause life-threatening cardiac arrhythmias.'
        },
        {
          q: 'Hemolysis of a blood sample produces a significant falsely elevated result for which electrolyte?',
          options: ['Potassium (K+)', 'Sodium (Na+)', 'Chloride (Cl-)', 'Bicarbonate (HCO3-)'],
          answer: 0,
          explanation: 'Intracellular potassium concentration inside RBCs is ~140 mEq/L; cell lysis releases high K+ into serum.'
        },
        {
          q: 'What is the standard technology used in modern automated clinical chemistry analyzers to measure electrolytes?',
          options: ['Ion Selective Electrodes (ISE)', 'Flame photometry', 'Paper chromatography', 'Biuret reaction'],
          answer: 0,
          explanation: 'ISE using ion-selective membranes (e.g. valinomycin for K+) is the rapid standard method.'
        }
      );
    }

    if (chapterId.includes('ch11') || chapterId.includes('ch12') || lowerTitle.includes('colorimetry') || lowerTitle.includes('quality control') || lowerTitle.includes('error')) {
      templates.push(
        {
          q: 'Beer’s Law states that the absorbance of monochromatic light by a solution is directly proportional to:',
          options: ['Concentration of the absorbing substance', 'Path length of the cuvette', 'Color of the filter only', 'Temperature of the room'],
          answer: 0,
          explanation: 'Beer’s Law states absorbance is directly proportional to concentration; Lambert’s Law relates to path length.'
        },
        {
          q: 'In colorimetry, what is the mathematical relationship between Optical Density (Absorbance) and Percentage Transmittance (%T)?',
          options: ['A = 2 - log10 (%T)', 'A = log10 (%T) / 2', 'A = 100 - %T', 'A = %T × 2'],
          answer: 0,
          explanation: 'Absorbance is related to transmittance by A = -log(T) = 2 - log10(%T).'
        },
        {
          q: 'A blood sample collected in the wrong anticoagulant tube is classified as which type of laboratory error?',
          options: ['Pre-analytical error', 'Analytical error', 'Post-analytical error', 'Random instrument error'],
          answer: 0,
          explanation: 'Pre-analytical errors occur prior to sample analysis (patient prep, collection tube, labeling, transport).'
        },
        {
          q: 'A control value falling outside the mean ± 3 Standard Deviations (3s rule) indicates:',
          options: ['Rejection of the analytical run due to random error', 'Acceptable normal variation', 'Perfect precision', 'Post-analytical success'],
          answer: 0,
          explanation: 'In Westgard multirule QC, a 1-3s violation indicates an out-of-control run that must be investigated.'
        },
        {
          q: 'On a Levey-Jennings QC chart, a continuous progressive drift of control values in one direction over 6 or more consecutive days is termed:',
          options: ['Trend (Systematic error)', 'Shift (Sudden systematic error)', 'Normal random error', 'Gaussian peak'],
          answer: 0,
          explanation: 'A trend represents gradual loss of calibration, lamp aging, or deteriorating reagents.'
        },
        {
          q: 'A sudden abrupt jump of control values to a new level on one side of the mean for consecutive days is called:',
          options: ['Shift (Systematic error)', 'Trend', 'Random variation', 'Outlier'],
          answer: 0,
          explanation: 'A shift indicates a sudden systematic change, such as new reagent lot, changed standard, or optical misalignment.'
        }
      );
    }
  }
}

// Fallback high-yield generator ensuring every specific topic reaches at least 35 questions
function ensureMinimumQuestionCount(topic: Topic, templates: QuestionTemplate[]) {
  const needed = 35 - templates.length;
  if (needed <= 0) return;

  const topicKeywords = topic.title.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').split(' ').filter(w => w.length > 3);
  const subjectName = topic.paperId === 'pathology' ? 'Pathology / Immunohematology' : topic.paperId === 'microbiology' ? 'Microbiology' : 'Clinical Biochemistry';

  const conceptualQuestions: QuestionTemplate[] = [
    {
      q: `Which of the following statements is clinically and practically correct regarding: "${topic.title}"?`,
      options: [
        `It requires strict adherence to standardized laboratory protocol and quality control.`,
        `It is performed without any standard operating procedure.`,
        `Temperature and reagent concentration have zero impact on results.`,
        `It is obsolete and banned in all diagnostic clinical laboratories.`
      ],
      answer: 0,
      explanation: `In ${subjectName}, accurate diagnostic interpretation depends strictly on validated standard operating procedures, timing, temperature, and quality controls.`
    },
    {
      q: `What is the most critical pre-requisite when investigating: "${topic.title}"?`,
      options: [
        `Proper specimen procurement, patient identification, and correct anticoagulants/reagents`,
        `Using uncalibrated pipettes and dirty glassware`,
        `Storing samples at 60°C before testing`,
        `Discarding control sera`
      ],
      answer: 0,
      explanation: `Pre-analytical precision, specimen integrity, and proper reagent selection are vital for reliable results.`
    },
    {
      q: `During laboratory examination of "${topic.title}", what represents an analytical error?`,
      options: [
        `Incorrect incubation temperature or expired reagent lot`,
        `Mislabeled patient tube collected at bedside`,
        `Delayed report delivery to the hospital ward`,
        `Incorrect hospital bed number entry in billing`
      ],
      answer: 0,
      explanation: `Analytical errors occur directly during test execution, including pipetting inaccuracies, expired reagents, or temperature fluctuations.`
    },
    {
      q: `In examination of "${topic.title}", what safety guideline is mandatory for DMLT technicians?`,
      options: [
        `Use Personal Protective Equipment (gloves, lab coat, eyewear) and treat all biological specimens as potentially infectious`,
        `Mouth pipetting of patient serum samples`,
        `Recapping needles manually with both hands without safety guards`,
        `Eating and drinking inside the specimen processing area`
      ],
      answer: 0,
      explanation: `Universal biosafety precautions dictate treating all human blood and fluid samples as hazardous infectious materials.`
    },
    {
      q: `What is the standard action when quality control values for "${topic.title}" fall outside established acceptable limits?`,
      options: [
        `Hold patient results, troubleshoot calibration/reagents, and re-run control samples`,
        `Report patient results immediately regardless of control error`,
        `Change the control target value manually to match the run`,
        `Ignore the control results`
      ],
      answer: 0,
      explanation: `When internal quality control fails, patient testing must be stopped until the root cause is resolved and verified.`
    },
    {
      q: `Which parameter ensures consistency and repeatability in tests concerning "${topic.title}"?`,
      options: [
        `Precision (reproducibility)`,
        `Random variation`,
        `Subjective guessing`,
        `Infrequent calibration`
      ],
      answer: 0,
      explanation: `Precision is the agreement between repeated measurements under specified test conditions.`
    },
    {
      q: `What is the term for closeness of a test result to the true accepted reference value in "${topic.title}"?`,
      options: [
        `Accuracy`,
        `Precision`,
        `Sensitivity`,
        `Specificity`
      ],
      answer: 0,
      explanation: `Accuracy describes how closely a measured laboratory value agrees with the certified true value.`
    },
    {
      q: `In viva questions regarding "${topic.title}", what is the primary role of a "negative control"?`,
      options: [
        `To rule out non-specific reactions and false positive results`,
        `To enhance enzyme kinetics`,
        `To act as a secondary antibody`,
        `To replace the clinical sample`
      ],
      answer: 0,
      explanation: `Negative controls verify that reagents do not yield false positive reactions in the absence of analyte.`
    },
    {
      q: `Which factor can directly produce a false negative result during testing for "${topic.title}"?`,
      options: [
        `Reagent deterioration or prozone phenomenon (antibody excess)`,
        `Optimal reagent concentration`,
        `Calibrated pipetting`,
        `Freshly reconstituted controls`
      ],
      answer: 0,
      explanation: `Expired reagents, incorrect dilutions, or antigen/antibody excess can lead to false negative results.`
    },
    {
      q: `What documentation is mandatory under NABL / ISO 15189 standards for "${topic.title}"?`,
      options: [
        `Complete Standard Operating Procedure (SOP) and equipment maintenance logbook`,
        `Informal unwritten verbal instructions`,
        `Deleted records after 2 hours`,
        `Blank worksheets`
      ],
      answer: 0,
      explanation: `Accredited clinical laboratories must maintain detailed SOPs, calibration histories, and audit records.`
    },
    {
      q: `What is the optimal storage temperature for standard biochemical and serological diagnostic reagents used in "${topic.title}"?`,
      options: [
        `2°C to 8°C in a monitored refrigerator`,
        `Direct sunlight at 40°C`,
        `-80°C with repeated daily freeze-thaw cycles`,
        `100°C water bath`
      ],
      answer: 0,
      explanation: `Diagnostic test kits and enzymatic reagents are typically stabilized for storage between 2°C and 8°C.`
    },
    {
      q: `In viva examination, what is the definition of analytical sensitivity in tests related to "${topic.title}"?`,
      options: [
        `The ability to detect the smallest amount of analyte in a sample`,
        `The ability to detect only the target analyte without cross-reaction`,
        `The speed of the mechanical analyzer`,
        `The cost of the disposable cuvettes`
      ],
      answer: 0,
      explanation: `Analytical sensitivity is the minimum detectable concentration (limit of detection) of an analyte.`
    },
    {
      q: `What is analytical specificity when evaluating "${topic.title}"?`,
      options: [
        `The ability to measure only the target substance without interfering cross-reactions`,
        `The time taken to print the test result`,
        `The degree of dilution of the sample`,
        `The number of samples analyzed per hour`
      ],
      answer: 0,
      explanation: `Specificity refers to freedom from interference or cross-reactivity with other substances in the specimen.`
    },
    {
      q: `When interpreting findings related to "${topic.title}", how is biological variation accounted for?`,
      options: [
        `By referencing age-, sex-, and population-specific reference intervals`,
        `Using one single universal number for all ages and genders`,
        `By ignoring clinical history`,
        `By guessing normal limits`
      ],
      answer: 0,
      explanation: `Reference intervals established for normal healthy populations account for diurnal, age, and sex-specific physiological variations.`
    },
    {
      q: `Which disposal method complies with Biomedical Waste (BMW) Management Rules for contaminated plastic tips used in "${topic.title}"?`,
      options: [
        `Red color-coded non-chlorinated plastic container for autoclavable contaminated plastics`,
        `Black domestic garbage bag`,
        `Discarding in municipal drain directly`,
        `Burying in hospital open ground`
      ],
      answer: 0,
      explanation: `Contaminated recyclable plastic waste like syringes, tubing, and tips is segregated into red bins for autoclaving/shredding.`
    },
    {
      q: `Which disposal bin is designated for anatomical and pathology tissue waste related to "${topic.title}"?`,
      options: [
        `Yellow color-coded bin for incineration`,
        `Blue bin`,
        `Black municipal bin`,
        `White translucent puncture-proof box`
      ],
      answer: 0,
      explanation: `Human anatomical waste, histology tissue fragments, and soiled cotton/gauze go into yellow bins for incineration.`
    },
    {
      q: `What is the significance of a "Reagent Blank" in quantitative procedures for "${topic.title}"?`,
      options: [
        `To zero the instrument and subtract background absorbance of reagents`,
        `To test patient serum without reagent`,
        `To increase optical turbidity`,
        `To double the final reading`
      ],
      answer: 0,
      explanation: `Reagent blank sets the spectrophotometer to zero absorbance, compensating for any intrinsic color of reagents.`
    },
    {
      q: `What is the role of a "Standard" in colorimetric or quantitative assays for "${topic.title}"?`,
      options: [
        `A solution with an accurately known concentration used to calculate unknown sample concentration`,
        `A random patient specimen`,
        `Distilled water without solutes`,
        `An expired control mixture`
      ],
      answer: 0,
      explanation: `A standard has an exact assigned concentration used in: Conc(Test) = [Abs(Test) / Abs(Standard)] × Conc(Standard).`
    },
    {
      q: `Why must hemolyzed serum be rejected or treated with extreme caution in tests concerning "${topic.title}"?`,
      options: [
        `Hemoglobin causes spectral interference at 400–600 nm and releases intracellular contents`,
        `It has no effect on optical tests`,
        `It solidifies the liquid reagent immediately`,
        `It turns all reagents into gas`
      ],
      answer: 0,
      explanation: `Free hemoglobin interferes with spectrophotometric readings and releases intracellular enzymes and electrolytes into serum.`
    },
    {
      q: `What is the first step when a technician detects an unexpected panic / critical value in "${topic.title}"?`,
      options: [
        `Verify sample identity, re-test the sample, and promptly notify the attending clinician`,
        `Discard the sample and close the file`,
        `Wait 48 hours before entering the result`,
        `Erase the laboratory register entry`
      ],
      answer: 0,
      explanation: `Critical panic values require immediate verification, documentation of telephonic notification, and rapid communication to the physician.`
    },
    {
      q: `Which optical component in an automated chemistry analyzer isolates monochromatic light of a specific wavelength for "${topic.title}"?`,
      options: [
        `Diffraction grating or interference filter`,
        `Tungsten halogen lamp`,
        `Cuvette wash station`,
        `Peristaltic pump`
      ],
      answer: 0,
      explanation: 'Monochromators (diffraction gratings or narrow-bandpass interference filters) isolate the desired measurement wavelength.'
    },
    {
      q: `In practical examination of "${topic.title}", what is the purpose of running duplicate tests?`,
      options: [
        `To ensure repeatability and minimize random pipetting error`,
        `To double the patient billing charge`,
        `To use up leftover reagents quickly`,
        `To confuse the examiner`
      ],
      answer: 0,
      explanation: `Replicate testing verifies pipetting precision and detects sporadic random errors.`
    },
    {
      q: `How should expired reagents for "${topic.title}" be handled in an accredited laboratory?`,
      options: [
        `Discarded and never used for diagnostic testing`,
        `Kept in use by increasing the incubation time`,
        `Mixed with new reagent kits`,
        `Relabeled with a new expiration date`
      ],
      answer: 0,
      explanation: `Expired diagnostic reagents lose analytical activity and must be segregated and discarded.`
    },
    {
      q: `What is the primary objective of External Quality Assessment Schemes (EQAS) in relation to "${topic.title}"?`,
      options: [
        `To compare laboratory accuracy against peer laboratories worldwide`,
        `To test daily technician attendance`,
        `To replace internal daily QC`,
        `To eliminate the need for standard operating procedures`
      ],
      answer: 0,
      explanation: `EQAS evaluates long-term testing accuracy and inter-laboratory comparability using blind proficiency samples.`
    },
    {
      q: `What type of water is mandatory for preparing reagents and reconstituting lyophilized controls for "${topic.title}"?`,
      options: [
        `CLRW (Clinical Laboratory Reagent Water) / Type I or II deionized water`,
        `Ordinary tap water`,
        `Bottled mineral drinking water`,
        `Boiled river water`
      ],
      answer: 0,
      explanation: `High-purity Clinical Laboratory Reagent Water free of ions, bacteria, and organics is required for sensitive assays.`
    },
    {
      q: `In a viva exam, the examiner asks: "What constitutes a post-analytical error in ${subjectName}?" An example is:`,
      options: [
        `Transcription error in typing the final report or misdirection of result`,
        `Hemolyzed blood collection`,
        `Air bubbles in spectrophotometer flow-cell`,
        `Using wrong filter wavelength`
      ],
      answer: 0,
      explanation: `Post-analytical errors encompass transcription slips, incorrect data entry, delayed result communication, or erroneous reference range printing.`
    },
    {
      q: `What is the primary purpose of a centrifuge in preparing specimens for "${topic.title}"?`,
      options: [
        `To separate serum or plasma from cellular elements by centrifugal acceleration`,
        `To heat the blood sample`,
        `To homogenize red blood cells into liquid`,
        `To evaporate excess water`
      ],
      answer: 0,
      explanation: `Centrifugation at 2000–3000 rpm for 10 minutes separates cellular components from clear supernatant serum or plasma.`
    },
    {
      q: `Why must centrifuge buckets always be carefully balanced with opposite equal-weight tubes before spinning for "${topic.title}"?`,
      options: [
        `To prevent severe vibration, rotor spindle damage, and tube breakage`,
        `To increase spinning speed by 200%`,
        `To make the motor silent only`,
        `To cool down the centrifuge chamber`
      ],
      answer: 0,
      explanation: `Unbalanced loads create heavy centrifugal wobble that damages motor bearings and risks catastrophic breakage of glass tubes.`
    },
    {
      q: `What is the standard action if a glass specimen tube breaks inside a centrifuge while testing "${topic.title}"?`,
      options: [
        `Turn off power, allow aerosol to settle for 30 minutes, wear heavy-duty gloves, disinfect bucket with 1% sodium hypochlorite, and remove glass shards with forceps`,
        `Reach inside immediately with bare hands to collect the broken glass`,
        `Turn speed to maximum to spin out the glass particles`,
        `Pour hot water inside and ignore the debris`
      ],
      answer: 0,
      explanation: `Centrifuge breakage generates dangerous infectious aerosols; a 30-minute settling period followed by hypochlorite disinfection is required.`
    },
    {
      q: `What is the shelf life of 1% freshly prepared sodium hypochlorite disinfectant solution used in laboratories?`,
      options: [
        `24 hours (prepared fresh daily)`,
        `1 year`,
        `6 months`,
        `Indefinite`
      ],
      answer: 0,
      explanation: `Sodium hypochlorite solutions degrade rapidly in light and air; working dilutions must be made fresh every 24 hours.`
    },
    {
      q: `In diagnostic procedures for "${topic.title}", which parameter measures the proportion of true positives correctly identified by a test?`,
      options: [
        `Diagnostic Sensitivity`,
        `Diagnostic Specificity`,
        `Negative Predictive Value`,
        `Standard Deviation`
      ],
      answer: 0,
      explanation: `Diagnostic sensitivity = [True Positives / (True Positives + False Negatives)] × 100.`
    },
    {
      q: `Which parameter measures the proportion of disease-free individuals who correctly test negative in "${topic.title}"?`,
      options: [
        `Diagnostic Specificity`,
        `Diagnostic Sensitivity`,
        `Positive Predictive Value`,
        `Coefficient of Variation`
      ],
      answer: 0,
      explanation: `Diagnostic specificity = [True Negatives / (True Negatives + False Positives)] × 100.`
    },
    {
      q: `What is the significance of Coefficient of Variation (CV%) in evaluating methods for "${topic.title}"?`,
      options: [
        `It expresses standard deviation as a percentage of the mean to compare precision across assays`,
        `It measures the total cost of testing`,
        `It indicates the number of patients seen per month`,
        `It represents patient survival probability`
      ],
      answer: 0,
      explanation: `CV% = (Standard Deviation / Mean) × 100. Lower CV indicates superior method precision.`
    },
    {
      q: `What is the fundamental conclusion a DMLT technician must understand regarding: "${topic.title}"?`,
      options: [
        `Competence requires theoretical mastery, meticulous technique, calibration awareness, and unwavering patient safety`,
        `Theory is unnecessary if you can guess answers`,
        `Quality control is purely an administrative formality`,
        `Results do not matter as long as tests run fast`
      ],
      answer: 0,
      explanation: `Medical laboratory technology demands theoretical depth, rigorous practical accuracy, and commitment to high-quality patient diagnostics.`
    }
  ];

  for (const q of conceptualQuestions) {
    if (templates.length >= 40) break;
    templates.push(q);
  }
}
