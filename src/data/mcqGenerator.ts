import { MCQQuestion, Topic } from '../types';

export interface QuestionTemplate {
  q: string;
  options: [string, string, string, string]; // [correctAnswer, wrong1, wrong2, wrong3]
  answer?: number;
  explanation: string;
}

// Utility to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Returns 30 rigorous, 2nd-year DMLT standard MCQs for the given topic.
 * Distractors and options are completely randomized across A, B, C, and D
 * with ~7-8 questions assigned to each option letter, eliminating any default to option A.
 */
export function getQuestionsForTopic(topic: Topic): MCQQuestion[] {
  const templates: QuestionTemplate[] = [];
  const { id, title, chapterId, paperId } = topic;

  // 1. Build topic & chapter domain questions conforming to DMLT 2nd Year standard
  buildDomainQuestions(paperId, chapterId, id, title, templates);

  // 2. Add high-standard clinical laboratory questions to ensure a 50+ question pool
  ensureMinimumQuestionCount(topic, templates);

  // 3. Shuffle pool and select exactly 30 questions
  const shuffledPool = shuffleArray(templates);
  const selected = shuffledPool.slice(0, 30);

  // 4. Create an evenly balanced distribution of correct answers across options A (0), B (1), C (2), D (3)
  // For 30 questions: balanced among 0, 1, 2, 3
  const baseSlots = [0, 1, 2, 3];
  const targetSlots: number[] = [];
  for (let i = 0; i < selected.length; i++) {
    targetSlots.push(baseSlots[i % 4]);
  }
  // Shuffle the target slots so the sequence of answers (A, B, C, D) is randomized across the test
  const randomizedSlots = shuffleArray(targetSlots);

  return selected.map((t, idx) => {
    const originalCorrectIndex = t.answer ?? 0;
    const correctText = t.options[originalCorrectIndex];
    const distractors = t.options.filter((_, i) => i !== originalCorrectIndex);
    const shuffledDistractors = shuffleArray(distractors);

    // Target slot for the correct answer: 0 = A, 1 = B, 2 = C, 3 = D
    const targetSlot = randomizedSlots[idx];
    const finalOptions: [string, string, string, string] = ['', '', '', ''];
    finalOptions[targetSlot] = correctText;

    let dIdx = 0;
    for (let slot = 0; slot < 4; slot++) {
      if (slot !== targetSlot) {
        finalOptions[slot] = shuffledDistractors[dIdx++];
      }
    }

    return {
      id: `${topic.id}_q_${idx + 1}`,
      question: t.q,
      options: finalOptions,
      correctAnswer: targetSlot,
      explanation: t.explanation
    };
  });
}

function buildDomainQuestions(
  paperId: string,
  chapterId: string,
  topicId: string,
  title: string,
  templates: QuestionTemplate[]
) {
  const lowerTitle = title.toLowerCase();

  // =========================================================================
  // PAPER I — PATHOLOGY (Blood Banking, Immunohematology, Histotechnology, Cytology)
  // =========================================================================
  if (paperId === 'pathology') {
    // Blood Group Genetics & Antigens
    if (lowerTitle.includes('abo') || lowerTitle.includes('h gene') || lowerTitle.includes('secretor') || lowerTitle.includes('group') || chapterId.includes('ch1') || chapterId.includes('ch3')) {
      templates.push(
        {
          q: 'Which specific glycosyltransferase enzyme is encoded by the human ABO "A" gene locus on chromosome 9?',
          options: [
            'UDP-N-acetylgalactosaminyltransferase',
            'UDP-galactosyltransferase',
            'Alpha-1,2-L-fucosyltransferase',
            'Sialyltransferase'
          ],
          explanation: 'The A gene specifies alpha-1,3-N-acetylgalactosaminyltransferase, which adds N-acetylgalactosamine (GalNAc) to the H antigen precursor.'
        },
        {
          q: 'Which immunodominant sugar defines the antigenic specificity of the Blood Group B antigen?',
          options: [
            'D-galactose',
            'N-acetylgalactosamine',
            'L-fucose',
            'N-acetylglucosamine'
          ],
          explanation: 'The B gene encodes alpha-1,3-D-galactosyltransferase, which attaches D-galactose to the terminal galactose of the H substance.'
        },
        {
          q: 'Individuals exhibiting the rare Bombay phenotype (Oh) inherit which genotype and lack which antigen?',
          options: [
            'Genotype hh; completely lack H, A, and B antigens on RBCs',
            'Genotype Hh; lack only A antigen',
            'Genotype SeSe; lack secretor status',
            'Genotype Rh null; lack D antigen'
          ],
          explanation: 'Bombay phenotype individuals are homozygous recessive (hh) for the FUT1 gene, unable to synthesize H antigen, and produce potent anti-H, anti-A, and anti-B.'
        },
        {
          q: 'Which seed extract lectin is routinely used in blood banking to differentiate subgroup A1 from subgroup A2?',
          options: [
            'Dolichos biflorus lectin (Anti-A1)',
            'Ulex europaeus lectin',
            'Bandeiraea simplicifolia',
            'Arachis hypogaea'
          ],
          explanation: 'Dolichos biflorus extract serves as Anti-A1 lectin, agglutinating A1 and A1B red cells but not A2 or A2B cells.'
        },
        {
          q: 'Which seed lectin reacts with the H substance and is used to verify the presence of H antigen?',
          options: [
            'Ulex europaeus lectin (Anti-H)',
            'Dolichos biflorus',
            'Salvia sclarea',
            'Vicia graminea'
          ],
          explanation: 'Ulex europaeus seed extract has Anti-H specificity, strongly agglutinating group O cells (which have the highest concentration of H substance).'
        },
        {
          q: 'On which human chromosome is the Secretor (Se) gene (FUT2) located?',
          options: [
            'Chromosome 19',
            'Chromosome 9',
            'Chromosome 1',
            'Chromosome 6'
          ],
          explanation: 'The secretor (Se) gene (FUT2) and H gene (FUT1) are closely linked on chromosome 19q13.3.'
        }
      );
    }

    // Rh System & Immunohematology
    if (lowerTitle.includes('rh') || lowerTitle.includes('du') || lowerTitle.includes('variant') || chapterId.includes('ch4')) {
      templates.push(
        {
          q: 'In the Fisher-Race nomenclature for the Rh blood group system, which antigens are considered alleles?',
          options: [
            'D/d (hypothetical), C/c, and E/e',
            'A, B, and H',
            'M, N, S, and s',
            'Fya and Fyb'
          ],
          explanation: 'Fisher-Race theorized three closely linked Rh gene loci with codominant alleles: C/c, E/e, and D (d designates the absence of D antigen).'
        },
        {
          q: 'What is the clinical significance of classifying a blood donor as Weak D (Du positive)?',
          options: [
            'The donor must be categorized as Rh Positive to prevent sensitizing Rh-negative recipients',
            'The donor is classified as Rh Negative',
            'The blood can only be given to Bombay phenotype patients',
            'The blood must be discarded immediately'
          ],
          explanation: 'Weak D donor units carry functional D antigen that can stimulate Anti-D antibody production in Rh-negative recipients; hence donors are labeled Rh Positive.'
        },
        {
          q: 'What is the primary immunological mechanism that causes Hemolytic Disease of the Fetus and Newborn (HDFN)?',
          options: [
            'Maternal IgG antibodies crossing the placenta and binding to fetal RhD-positive erythrocytes',
            'Maternal IgM antibodies lysing fetal white blood cells',
            'Fetal IgA antibodies attacking maternal red cells',
            'Complement activation by maternal IgE antibodies'
          ],
          explanation: 'Maternal IgG anti-D (produced after prior sensitization) crosses the placental syncytiotrophoblast barrier and destroys fetal Rh-positive red cells in utero.'
        }
      );
    }

    // Coomb's Test & Cross-matching
    if (lowerTitle.includes('coomb') || lowerTitle.includes('antiglobulin') || lowerTitle.includes('cross') || lowerTitle.includes('compat') || chapterId.includes('ch5') || chapterId.includes('ch6')) {
      templates.push(
        {
          q: 'What is the primary cause of false-negative results in the Indirect Antiglobulin Test (IAT)?',
          options: [
            'Inadequate saline washing of red cells leading to neutralization of AHG reagent by free trace globulins',
            'Over-centrifugation of the reaction tube',
            'Use of contaminated test tubes',
            'Extreme bacterial contamination of the sample'
          ],
          explanation: 'Trace free serum IgG globulins (as little as 1 µg/mL) will neutralize the Anti-Human Globulin reagent, leaving no AHG to crosslink sensitized red cells.'
        },
        {
          q: 'Polyspecific Anti-Human Globulin (AHG / Coomb’s) reagent is formulated to detect:',
          options: [
            'Both human IgG antibodies and C3d complement components bound to red blood cells',
            'Only human IgM antibodies',
            'Only anti-D antibodies',
            'Platelet factor 4 and fibrinogen'
          ],
          explanation: 'Polyspecific AHG contains rabbit or murine monoclonal anti-human IgG and anti-C3d (complement fraction) to detect both antibodies and complement.'
        },
        {
          q: 'What does the Major Crossmatch test in pre-transfusion compatibility testing?',
          options: [
            'Donor red blood cells mixed with recipient serum',
            'Recipient red blood cells mixed with donor serum',
            'Donor plasma mixed with recipient plasma',
            'Donor red cells mixed with saline control'
          ],
          explanation: 'The Major Crossmatch verifies that the recipient serum does not contain preformed antibodies directed against donor red blood cell antigens.'
        },
        {
          q: 'In compatibility testing, what is the role of Low Ionic Strength Solution (LISS)?',
          options: [
            'Reduces the net electrostatic charge (zeta potential) to accelerate antibody uptake and shorten incubation time to 10–15 minutes',
            'Completely dissolves RBC membranes',
            'Neutralizes naturally occurring IgM antibodies',
            'Prevents clotting of serum'
          ],
          explanation: 'LISS reduces ionic shielding around red cells, lowering the zeta potential barrier and allowing IgG antibodies to bind antigens in 10–15 min at 37°C.'
        }
      );
    }

    // Blood Components & Transfusion Reactions
    if (lowerTitle.includes('component') || lowerTitle.includes('transfusion') || lowerTitle.includes('storage') || chapterId.includes('ch7')) {
      templates.push(
        {
          q: 'What are the major therapeutic coagulation factors present in Cryoprecipitate?',
          options: [
            'Factor VIII:C, Fibrinogen, von Willebrand Factor (vWF), and Factor XIII',
            'Factor II, VII, IX, and X only',
            'Albumin and Immunoglobulin G only',
            'Platelet factor 3 and Calcium'
          ],
          explanation: 'Cryoprecipitate is the cold-insoluble precipitate of thawed FFP enriched in Factor VIII, Fibrinogen (≥150 mg), vWF, and Factor XIII.'
        },
        {
          q: 'What is the mandatory storage temperature and shelf life of Fresh Frozen Plasma (FFP)?',
          options: [
            '-18°C or colder for up to 1 year (-30°C preferred)',
            '2°C to 6°C for 35 days',
            '20°C to 24°C for 5 days',
            'Room temperature for 48 hours'
          ],
          explanation: 'FFP must be frozen within 8 hours of phlebotomy and stored at -18°C or below for up to 12 months to preserve labile factors V and VIII.'
        },
        {
          q: 'Platelet concentrates must be maintained at what temperature and physical condition?',
          options: [
            '20°C to 24°C with continuous gentle horizontal agitation for a maximum of 5 days',
            '2°C to 6°C without agitation for 21 days',
            '-20°C frozen for 6 months',
            '37°C in an incubator for 48 hours'
          ],
          explanation: 'Platelets require constant agitation at 20°C–24°C to allow gas exchange (O2/CO2) across the bag membrane and prevent platelet aggregation/activation.'
        },
        {
          q: 'Which life-threatening pulmonary complication occurs within 6 hours of transfusion due to anti-HLA or anti-neutrophil antibodies in donor plasma?',
          options: [
            'Transfusion-Related Acute Lung Injury (TRALI)',
            'Transfusion-Associated Circulatory Overload (TACO)',
            'Delayed Hemolytic Transfusion Reaction (DHTR)',
            'Post-transfusion purpura'
          ],
          explanation: 'TRALI is non-cardiogenic pulmonary edema triggered by donor leukocyte antibodies that activate recipient pulmonary neutrophils.'
        }
      );
    }

    // Histopathology: Fixatives, Processing, Microtomy, Staining Chemistry
    if (lowerTitle.includes('fixat') || lowerTitle.includes('process') || lowerTitle.includes('microtome') || lowerTitle.includes('stain') || lowerTitle.includes('decalc') || chapterId.includes('ch8') || chapterId.includes('ch9') || chapterId.includes('ch10') || chapterId.includes('ch11') || chapterId.includes('ch12') || chapterId.includes('ch13') || chapterId.includes('ch14') || chapterId.includes('ch15') || chapterId.includes('ch16') || chapterId.includes('ch17') || chapterId.includes('ch18')) {
      templates.push(
        {
          q: 'What is the primary chemical mechanism of tissue fixation by 10% Neutral Buffered Formalin?',
          options: [
            'Forms covalent methylene cross-links (-CH2-) between amino groups of adjacent polypeptide chains',
            'Precipitates cellular proteins via heavy metal denaturation',
            'Extracts intracellular lipids and carbohydrates',
            'Hydrolyzes nucleic acids into nucleotides'
          ],
          explanation: 'Formaldehyde cross-links protein amino groups via reactive methylene bridges, insolubilizing structural and enzymatic cellular proteins.'
        },
        {
          q: 'How is dark brown/black formalin pigment (acid formaldehyde hematin) removed from tissue sections before staining?',
          options: [
            'Treatment with saturated alcoholic picric acid or 1% alcoholic ammonium hydroxide',
            'Washing with concentrated hydrochloric acid',
            'Immersion in boiling distilled water',
            'Bleaching with potassium permanganate'
          ],
          explanation: 'Formalin pigment formed in bloody tissues at acidic pH is removed by immersing hydrated sections in saturated alcoholic picric acid for 10–30 min.'
        },
        {
          q: 'Bouin’s fixative solution is composed of which three chemical ingredients?',
          options: [
            'Saturated aqueous picric acid, 40% formaldehyde, and glacial acetic acid (15:5:1)',
            'Mercuric chloride, potassium dichromate, and sodium sulfate',
            'Absolute ethanol, chloroform, and acetic acid',
            'Glutaraldehyde, osmium tetroxide, and cacodylate buffer'
          ],
          explanation: 'Bouin’s fluid contains picric acid (coagulates proteins), formalin (crosslinks), and glacial acetic acid (counteracts picric acid shrinkage; lyses RBCs).'
        },
        {
          q: 'Which chemical reagent is used to determine the end point of decalcification chemically?',
          options: [
            'Ammonium hydroxide and 5% ammonium oxalate (detects calcium oxalate precipitate)',
            'Barium chloride and sulfuric acid',
            'Silver nitrate and potassium chromate',
            'Benedict’s reagent'
          ],
          explanation: 'Adding ammonium oxalate to neutralized decalcifying fluid precipitates insoluble calcium oxalate if calcium is still leaching from bone.'
        },
        {
          q: 'What is the standard clearance angle between the microtome knife facet and the paraffin tissue block?',
          options: [
            '5° to 10°',
            '25° to 30°',
            '0° (flat)',
            '45° to 60°'
          ],
          explanation: 'A clearance angle of 5° to 10° prevents knife facet friction and compression while preventing skipping or chatter.'
        },
        {
          q: 'In microtomy, what is the primary technical cause of "chatter" (fine horizontal parallel lines across the section)?',
          options: [
            'Excessive clearance angle, loose knife clamping screw, or extremely hard/calcified tissue',
            'Water bath temperature too hot',
            'Knife angle too small (zero clearance)',
            'Paraffin wax melting point too low'
          ],
          explanation: 'Chatter is mechanical vibration caused by knife looseness, excessive clearance angle, or tissue resistance.'
        },
        {
          q: 'In Hematoxylin preparation, what is the chemical oxidation product of hematoxylin that acts as the active dye?',
          options: [
            'Hematein',
            'Hematoidin',
            'Hemosiderin',
            'Hematoporphyrin'
          ],
          explanation: 'Natural hematoxylin is a non-staining phenol oxidized (ripened) into hematein by sodium iodate or atmospheric oxygen.'
        },
        {
          q: 'What is the purpose of the "bluing" step in regressive H&E staining following acid-alcohol differentiation?',
          options: [
            'Converts the reddish-soluble alum-hematein lake into an insoluble blue-purple lake in an alkaline environment',
            'Removes excess eosin from the cytoplasm',
            'Decolorizes background mucus',
            'Dehydrates the tissue section'
          ],
          explanation: 'Alkaline bluing solutions (Scott’s tap water, lithium carbonate) change the pH above 8.0, converting hematein into an insoluble blue-purple complex.'
        },
        {
          q: 'What is the chemical principle of the Periodic Acid–Schiff (PAS) stain?',
          options: [
            'Periodic acid oxidizes 1,2-glycol groups to dialdehydes, which recolor colorless Schiff’s reagent to magenta-pink',
            'Acid dyes bind selectively to basic nuclear histones',
            'Silver nitrate is reduced to black metallic silver by argyrophil granules',
            'Basic fuchsin stains bacterial mycolic acids'
          ],
          explanation: 'Periodic acid oxidizes 1,2-glycol groups into dialdehydes, which react with basic fuchsin-sulfurous acid (Schiff’s reagent) to form a magenta quinoid dye.'
        },
        {
          q: 'When stained with Congo Red and viewed under a polarizing microscope, amyloid demonstrates which characteristic optical feature?',
          options: [
            'Apple-green birefringence',
            'Golden yellow fluorescence',
            'Red dichroism without birefringence',
            'Jet black opalescence'
          ],
          explanation: 'Congo red molecules intercalate between anti-parallel beta-pleated sheets of amyloid fibrils, producing apple-green birefringence under crossed polars.'
        },
        {
          q: 'What chemical entity is demonstrated by Perl’s Prussian Blue reaction in histopathology?',
          options: [
            'Ferric iron (Fe3+) in hemosiderin, forming insoluble ferric ferrocyanide',
            'Ferrous iron (Fe2+) in hemoglobin',
            'Calcium phosphate complexes',
            'Copper deposits in Wilson’s disease'
          ],
          explanation: 'Dilute hydrochloric acid releases ferric iron from hemosiderin, which reacts with potassium ferrocyanide to form Prussian blue (ferric ferrocyanide).'
        }
      );
    }
  }

  // =========================================================================
  // PAPER II — MICROBIOLOGY (Bacteriology, Culture Media, Sterilization, Parasitology, Virology, Mycology)
  // =========================================================================
  if (paperId === 'microbiology') {
    // Sterilization & Disinfection
    if (lowerTitle.includes('steril') || lowerTitle.includes('autoclave') || lowerTitle.includes('oven') || chapterId.includes('ch1')) {
      templates.push(
        {
          q: 'Which bacterial endospore is the international standard biological indicator for validating steam Autoclave cycles?',
          options: [
            'Geobacillus stearothermophilus spores',
            'Bacillus atrophaeus spores',
            'Clostridium tetani spores',
            'Bacillus subtilis var. niger'
          ],
          explanation: 'Spore strips of thermophilic Geobacillus stearothermophilus (killed at 121°C in 15 min) validate moist heat autoclaving efficacy.'
        },
        {
          q: 'What biological indicator is utilized to evaluate dry heat sterilization in a Hot Air Oven?',
          options: [
            'Bacillus atrophaeus (Bacillus subtilis var. niger) spores',
            'Geobacillus stearothermophilus',
            'Clostridium sporogenes',
            'Pseudomonas aeruginosa'
          ],
          explanation: 'Bacillus atrophaeus spores are highly resistant to dry heat and are standard indicators for validating hot air ovens (160°C for 2h).'
        },
        {
          q: 'What is the standard nominal pore size of membrane filters used to sterilize heat-labile biological fluids (sera, urea, antibiotics)?',
          options: [
            '0.22 micron (µm)',
            '1.20 micron (µm)',
            '5.00 micron (µm)',
            '0.01 micron (µm)'
          ],
          explanation: 'Cellulose acetate/nitrate membranes with 0.22 µm pore size filter out all vegetative bacteria, including Pseudomonas and Salmonella.'
        },
        {
          q: 'Activated 2% alkaline Glutaraldehyde (Cidex) requires what contact duration to achieve true sporicidal sterilization (cold sterilization)?',
          options: [
            '10 hours of continuous immersion',
            '20 minutes of immersion',
            '2 hours of immersion',
            '1 minute of wipe-down'
          ],
          explanation: '2% buffered glutaraldehyde kills vegetative bacteria in 10–20 minutes, but requires 10 hours of immersion to destroy bacterial endospores.'
        }
      );
    }

    // Culture Media & Bacterial Identification
    if (lowerTitle.includes('media') || lowerTitle.includes('culture') || lowerTitle.includes('gram') || lowerTitle.includes('biochemical') || chapterId.includes('ch2')) {
      templates.push(
        {
          q: 'Chocolate agar is prepared by heating blood agar to 80°C to release which two essential growth factors?',
          options: [
            'Factor X (Hemin) and Factor V (NAD)',
            'Factor VIII and Factor IX',
            'Thiamine and Biotin',
            'Calcium and Magnesium ions'
          ],
          explanation: 'Gentle lysis of red cells at 80°C releases Factor X (heat-stable hemin) and Factor V (heat-labile NAD), required for Haemophilus and Neisseria.'
        },
        {
          q: 'What is the selective and differential mechanism of MacConkey Agar?',
          options: [
            'Bile salts and crystal violet inhibit Gram-positive bacteria; neutral red indicates lactose fermentation by turning pink',
            'Sodium azide inhibits Gram-negative bacilli; bromothymol blue indicates sucrose fermentation',
            'Malachite green inhibits non-mycobacteria; phenol red detects urea',
            'Tellurite selects for Corynebacterium by turning black'
          ],
          explanation: 'Bile salts/crystal violet inhibit Gram-positive microbes; lactose fermenters produce acid that turns neutral red indicator bright pink.'
        },
        {
          q: 'Which selective medium produces jet-black colonies with a distinct metallic sheen for Salmonella enterica serovar Typhi?',
          options: [
            'Wilson and Blair’s Bismuth Sulfite Agar',
            'TCBS Agar',
            'MacConkey Agar',
            'Lowenstein-Jensen Medium'
          ],
          explanation: 'Bismuth sulfite agar reduces bismuth in the presence of H2S produced by Salmonella Typhi, precipitating black bismuth sulfide with metallic sheen.'
        },
        {
          q: 'In the Kovac’s reagent used for the Indole test, what chemical detects indole produced from tryptophan?',
          options: [
            'para-Dimethylaminobenzaldehyde in isoamyl alcohol and concentrated HCl',
            'Alpha-naphthol and 40% potassium hydroxide',
            'Sulfanilic acid and alpha-naphthylamine',
            'Bromothymol blue and sodium citrate'
          ],
          explanation: 'Tryptophanase degrades tryptophan to indole; p-dimethylaminobenzaldehyde reacts with indole to form a cherry-red rosindole dye layer.'
        },
        {
          q: 'What reagent is used in the Cytochrome Oxidase test for identifying Pseudomonas aeruginosa?',
          options: [
            '1% aqueous Tetramethyl-para-phenylenediamine dihydrochloride (Kovac’s oxidase reagent)',
            '3% Hydrogen peroxide solution',
            'Sulfosalicylic acid solution',
            'Diazo reagent'
          ],
          explanation: 'Cytochrome c oxidase oxidizes tetramethyl-p-phenylenediamine dihydrochloride to deep indophenol purple within 10–15 seconds.'
        },
        {
          q: 'What are the CLSI standardized parameters for the Kirby-Bauer disk diffusion susceptibility test?',
          options: [
            'Mueller-Hinton Agar, 4 mm depth, pH 7.2–7.4, 0.5 McFarland turbidity standard',
            'Nutrient Agar, 10 mm depth, 2.0 McFarland standard',
            'Blood Agar, 2 mm depth, no turbidity standardization',
            'Brain Heart Infusion, 6 mm depth, pH 6.0'
          ],
          explanation: 'MHA poured to 4 mm depth (preventing false resistance/susceptibility) at pH 7.2–7.4 with 0.5 McFarland (1.5 x 10^8 CFU/mL) is strictly standard.'
        }
      );
    }

    // Parasitology & Mycology
    if (lowerTitle.includes('parasit') || lowerTitle.includes('stool') || lowerTitle.includes('fung') || lowerTitle.includes('malaria') || chapterId.includes('ch3') || chapterId.includes('ch5')) {
      templates.push(
        {
          q: 'Which morphological feature distinguishes the mature cyst of Entamoeba histolytica from Entamoeba coli?',
          options: [
            'E. histolytica has maximum 4 nuclei with central karyosome and rounded chromidial bars; E. coli has up to 8 nuclei with splintered ends',
            'E. histolytica cysts have 16 nuclei',
            'E. histolytica lacks chromidial bars entirely',
            'E. histolytica has eccentric karyosome and no chromatoid bodies'
          ],
          explanation: 'Mature E. histolytica cysts possess 1–4 spherical nuclei with central compact karyosome and thick, blunt-ended cigar-shaped chromidial bars.'
        },
        {
          q: 'In a peripheral blood smear, observing multiple delicate ring forms, appliqué (accolé) marginal forms, and banana-shaped gametocytes diagnostic of:',
          options: [
            'Plasmodium falciparum',
            'Plasmodium vivax',
            'Plasmodium malariae',
            'Plasmodium ovale'
          ],
          explanation: 'Plasmodium falciparum characteristically exhibits multiple rings per RBC, appliqué forms at the RBC periphery, and crescent/banana-shaped gametocytes.'
        },
        {
          q: 'What is the biological role of 10% to 20% Potassium Hydroxide (KOH) in direct microscopic fungal diagnosis?',
          options: [
            'Digests host keratin, cellular debris, and proteinaceous exudate while preserving fungal chitinous cell walls intact',
            'Stains fungal mycelium bright fluorescent green',
            'Kills bacteria and fungi simultaneously',
            'Converts yeast cells into chlamydospores'
          ],
          explanation: 'KOH clears opaque keratinaceous nail, skin, or hair scales without digesting fungal glucans and chitin, making fungal hyphae readily visible.'
        },
        {
          q: 'In Lactophenol Cotton Blue (LPCB) fungal mount, what specific function does Phenol perform?',
          options: [
            'Acts as a rapid fungicidal agent to inactivate living fungal elements safely',
            'Stains the chitinous cell wall dark blue',
            'Prevents the preparation from drying out (humectant)',
            'Clears tissue keratin like KOH'
          ],
          explanation: 'Phenol kills fungal organisms; lactic acid preserves fungal structure; glycerol prevents evaporation; and cotton blue stains fungal chitin.'
        },
        {
          q: 'The Germ Tube test (Reynolds-Braude phenomenon) is a rapid diagnostic test for presumptive identification of:',
          options: [
            'Candida albicans',
            'Cryptococcus neoformans',
            'Aspergillus fumigatus',
            'Histoplasma capsulatum'
          ],
          explanation: 'Candida albicans forms true parallel germ tubes without constriction at the mother yeast cell within 2–3 hours in human serum at 37°C.'
        }
      );
    }

    // Virology & Serology
    if (lowerTitle.includes('virus') || lowerTitle.includes('hiv') || lowerTitle.includes('hepatitis') || lowerTitle.includes('serolog') || chapterId.includes('ch4')) {
      templates.push(
        {
          q: 'In acute Hepatitis B infection, which serological marker is typically the sole detectable marker during the "window period"?',
          options: [
            'IgM Anti-HBc (anti-Hepatitis B core antibody IgM)',
            'HBsAg',
            'Anti-HBs antibody',
            'HBeAg'
          ],
          explanation: 'The window period is the gap between HBsAg disappearance and anti-HBs appearance; IgM anti-HBc is the only positive diagnostic serological marker.'
        },
        {
          q: 'Fourth-generation HIV diagnostic screening ELISA assays detect which viral component in addition to anti-HIV antibodies?',
          options: [
            'HIV-1 p24 capsid core antigen',
            'gp120 envelope glycoprotein',
            'Reverse transcriptase enzyme',
            'Viral RNA genome directly'
          ],
          explanation: '4th generation "combo" assays detect both HIV-1/2 antibodies and free HIV p24 antigen, shortening the seroconversion window to ~14 days.'
        },
        {
          q: 'What causes the "Prozone phenomenon" in serological agglutination assays?',
          options: [
            'High antibody excess relative to antigen concentration preventing cross-linked lattice formation',
            'Antigen excess preventing antibody binding',
            'Depletion of complement components',
            'High electrolyte concentration in saline'
          ],
          explanation: 'In the prozone, excess free antibody coats all available antigenic epitopes without forming bridging lattices, giving a false-negative agglutination result.'
        }
      );
    }
  }

  // =========================================================================
  // PAPER III — BIOCHEMISTRY (Clinical Enzymology, Carbohydrates, LFT, RFT, ABG, Quality Control)
  // =========================================================================
  if (paperId === 'biochemistry') {
    // Carbohydrate & Diabetes
    if (lowerTitle.includes('glucose') || lowerTitle.includes('diabet') || lowerTitle.includes('gtt') || lowerTitle.includes('hba1c') || chapterId.includes('ch1')) {
      templates.push(
        {
          q: 'In the enzymatic GOD-POD method for blood glucose determination, which chromogenic couple produces the pink/red quinoneimine dye?',
          options: [
            '4-Aminophenazone (4-aminoantipyrine) and Phenol',
            'Sodium nitroprusside and glycine',
            'Alkaline picrate and sodium hydroxide',
            'Bromocresol green and succinate buffer'
          ],
          explanation: 'Glucose oxidase generates H2O2; Peroxidase couples H2O2 with 4-aminophenazone and phenol to produce red quinoneimine dye measured at 505 nm.'
        },
        {
          q: 'Which enzymatic methodology is recognized as the primary reference standard for serum glucose measurement?',
          options: [
            'Hexokinase / Glucose-6-Phosphate Dehydrogenase method measuring NADPH at 340 nm',
            'GOD-POD colorimetric method',
            'Orthotoluidine condensation method',
            'Folin-Wu phosphomolybdic acid method'
          ],
          explanation: 'The Hexokinase method is the definitive reference method due to its absolute specificity for glucose and stoichiometric NADPH production at 340 nm.'
        },
        {
          q: 'According to WHO guidelines for the standard 75g Oral Glucose Tolerance Test (OGTT), what 2-hour venous plasma value confirms Diabetes Mellitus?',
          options: [
            'Venous plasma glucose ≥ 200 mg/dL (11.1 mmol/L)',
            'Venous plasma glucose 140 to 199 mg/dL',
            'Venous plasma glucose 100 to 125 mg/dL',
            'Venous plasma glucose < 140 mg/dL'
          ],
          explanation: 'A 2-hour post-load glucose ≥ 200 mg/dL (or fasting plasma glucose ≥ 126 mg/dL) establishes the diagnostic criteria for Diabetes Mellitus.'
        },
        {
          q: 'What chemical structure is formed in the synthesis of Glycated Hemoglobin (HbA1c)?',
          options: [
            'Non-enzymatic ketoamine condensation between glucose and the N-terminal valine of hemoglobin beta chains',
            'Enzymatic phosphorylation of alpha-globin chains',
            'Reversible Schiff base linkage with lysine residues',
            'Oxidation of heme iron to methemoglobin'
          ],
          explanation: 'Glucose reacts non-enzymatically with the N-terminal valine of the beta-globin chain, undergoing an Amadori rearrangement to stable HbA1c.'
        }
      );
    }

    // Liver Function & Enzymology
    if (lowerTitle.includes('lft') || lowerTitle.includes('liver') || lowerTitle.includes('bilirubin') || lowerTitle.includes('enzyme') || chapterId.includes('ch2')) {
      templates.push(
        {
          q: 'In the Malloy-Evelyn or Jendrassik-Grof bilirubin assay, what chemical accelerator is required to measure unconjugated (indirect) bilirubin?',
          options: [
            'Caffeine-sodium benzoate or methanol',
            'Sodium hypochlorite',
            'Trichloroacetic acid',
            'Glacial acetic acid'
          ],
          explanation: 'Unconjugated bilirubin is non-covalently bound to albumin and hydrophobic; caffeine-benzoate or methanol dissociates it to react with diazo reagent.'
        },
        {
          q: 'Which aminotransferase enzyme is strictly localized to the hepatocellular cytoplasm and exhibits higher liver specificity?',
          options: [
            'Alanine Aminotransferase (ALT / SGPT)',
            'Aspartate Aminotransferase (AST / SGOT)',
            'Lactate Dehydrogenase (LDH-1)',
            'Creatine Kinase (CK-MB)'
          ],
          explanation: 'ALT is purely cytoplasmic and predominantly found in hepatocytes; AST has both cytoplasmic and mitochondrial isoenzymes and is abundant in heart/muscle.'
        },
        {
          q: 'Serum Alkaline Phosphatase (ALP) activity is measured in clinical laboratories using which substrate at an optimum alkaline pH of 10.5?',
          options: [
            'para-Nitrophenyl phosphate (pNPP)',
            'Phenolphthalein monophosphate',
            'Alpha-naphthyl phosphate',
            'Glycerophosphate'
          ],
          explanation: 'Bessey-Lowry-Brock method hydrolyzes colorless p-nitrophenyl phosphate into yellow p-nitrophenol at alkaline pH 10.5, measured at 405 nm.'
        },
        {
          q: 'In the Biuret reaction for total serum protein estimation, what is the minimum molecular requirement for color development?',
          options: [
            'Presence of at least two peptide bonds (-CONH-) to chelate cupric (Cu2+) ions in alkaline solution',
            'Presence of free amino acid valine',
            'Aromatic amino acids tyrosine and tryptophan',
            'Intact disulfide bridges'
          ],
          explanation: 'Cupric ions in alkaline Biuret reagent coordinate with four nitrogen atoms from at least two adjacent peptide bonds to form a violet complex measured at 540 nm.'
        },
        {
          q: 'What specific dye is universally employed in automated clinical analyzers for the selective determination of serum Albumin at pH 4.2?',
          options: [
            'Bromocresol Green (BCG)',
            'Bromothymol Blue',
            'Methyl Orange',
            'Coomassie Brilliant Blue'
          ],
          explanation: 'At pH 4.2, albumin carries a net positive charge and selectively binds the anionic BCG dye to produce a green-blue complex measured at 628 nm.'
        }
      );
    }

    // Renal Function & Clearance
    if (lowerTitle.includes('rft') || lowerTitle.includes('kidney') || lowerTitle.includes('creatinine') || lowerTitle.includes('urea') || chapterId.includes('ch3')) {
      templates.push(
        {
          q: 'What is the chemical basis of the classic Jaffe reaction for estimating serum and urinary creatinine?',
          options: [
            'Creatinine reacts with picric acid in an alkaline medium to form an orange-red creatinine-picrate tautomer',
            'Coupling of creatinine with diazonium salt',
            'Oxidation of creatinine by ferricyanide',
            'Condensation with diacetyl monoxime'
          ],
          explanation: 'In alkaline solution, creatinine and picric acid form a red-orange Janovski complex measured spectrophotometrically between 500 and 520 nm.'
        },
        {
          q: 'What is the standard formula for calculating Endogenous Creatinine Clearance (GFR)?',
          options: [
            'Clearance (mL/min) = (Urine Creatinine [mg/dL] x Urine Volume [mL/min]) / Plasma Creatinine [mg/dL]',
            'Clearance = (Plasma Creatinine x Urine Volume) / Urine Creatinine',
            'Clearance = (Urine Creatinine x Plasma Creatinine) / 1440',
            'Clearance = Blood Urea Nitrogen / Serum Creatinine'
          ],
          explanation: 'Creatinine clearance = (U x V) / P, where U is urine creatinine concentration, V is urine flow rate in mL/min, and P is plasma creatinine.'
        },
        {
          q: 'In the enzymatic UV Berthelot or GLDH method for Blood Urea Nitrogen (BUN), what primary enzyme catalyzes the hydrolysis of urea?',
          options: [
            'Urease',
            'Glutamate dehydrogenase',
            'Uricase',
            'Arginase'
          ],
          explanation: 'Urease catalyzes the hydrolysis of urea into ammonia and carbon dioxide; ammonia is then quantified by the Berthelot color reaction or GLDH consumption of NADH.'
        }
      );
    }

    // Electrolytes & Quality Assurance
    if (lowerTitle.includes('electrolyt') || lowerTitle.includes('qc') || lowerTitle.includes('westgard') || lowerTitle.includes('abg') || chapterId.includes('ch4') || chapterId.includes('ch5')) {
      templates.push(
        {
          q: 'In Ion-Selective Electrode (ISE) analyzers, what specific ionophore antibiotic is incorporated into the polymeric membrane for selective Potassium (K+) detection?',
          options: [
            'Valinomycin',
            'Gramicidin',
            'Monensin',
            'Crown ether 12-crown-4'
          ],
          explanation: 'Valinomycin has a cyclic cavity with high stereochemical specificity for potassium ions, excluding smaller hydrated sodium ions by a factor of 10,000:1.'
        },
        {
          q: 'In Arterial Blood Gas (ABG) evaluation, a patient with pH 7.24, pCO2 26 mmHg, and serum HCO3- 11 mEq/L presents with:',
          options: [
            'Metabolic acidosis with partial respiratory compensation (hyperventilation)',
            'Primary respiratory acidosis',
            'Metabolic alkalosis',
            'Uncompensated respiratory alkalosis'
          ],
          explanation: 'Low pH (<7.35) and low HCO3- (<22 mEq/L) indicate primary metabolic acidosis; low pCO2 (<35 mmHg) reflects compensatory hyperventilation.'
        },
        {
          q: 'In laboratory quality control, which Westgard multirule designates an immediate analytical run rejection due to Random Error?',
          options: [
            '1_3s rule (a single control measurement exceeds the Mean ± 3 Standard Deviations)',
            '2_2s rule',
            '4_1s rule',
            '10_x rule'
          ],
          explanation: 'The 1_3s rule is violated when one control observation exceeds ±3SD, signaling a high probability of random analytical error that requires run rejection.'
        },
        {
          q: 'Which Westgard multirule violation detects Systematic Error (drift or calibration shift) when two consecutive control results exceed the same +2SD or -2SD limit?',
          options: [
            '2_2s rule',
            '1_2s rule',
            'R_4s rule',
            '1_3s rule'
          ],
          explanation: 'The 2_2s rule is violated when two consecutive runs exceed the same 2SD limit, detecting systematic bias (e.g. reagent deterioration, calibration shift).'
        },
        {
          q: 'According to the Beer-Lambert Law, if the measured Absorbance (Optical Density) of a colored solution is 1.0, what is the percentage Transmittance (%T)?',
          options: [
            '10% Transmittance',
            '1% Transmittance',
            '50% Transmittance',
            '0.1% Transmittance'
          ],
          explanation: 'Absorbance = 2 - log(%T). If A = 1.0, then 1.0 = 2 - log(%T) => log(%T) = 1.0 => %T = 10%.'
        }
      );
    }
  }
}

// Comprehensive clinical laboratory questions conforming to 2nd-year DMLT academic syllabus
function ensureMinimumQuestionCount(topic: Topic, templates: QuestionTemplate[]) {
  const dmlt2ndYearCoreQuestions: QuestionTemplate[] = [
    {
      q: 'Which anticoagulant prevents blood coagulation by chelating ionized calcium into an insoluble complex and is optimal for hematological counts?',
      options: [
        'K2-EDTA (Dipotassium ethylenediaminetetraacetic acid)',
        'Sodium Citrate',
        'Sodium Heparin',
        'Sodium Fluoride'
      ],
      explanation: 'EDTA binds divalent calcium ions (Factor IV), preventing thrombin formation and preserving cellular morphology without shrinking red cells.'
    },
    {
      q: 'Why is Sodium Fluoride combined with Potassium Oxalate in collection tubes dedicated for plasma glucose estimation?',
      options: [
        'Fluoride inhibits the enolase enzyme in the glycolytic pathway, preventing in vitro glucose breakdown by RBCs',
        'Fluoride accelerates insulin activity',
        'Fluoride dissolves white blood cells',
        'Fluoride preserves glycated hemoglobin'
      ],
      explanation: 'Sodium fluoride inhibits enolase (which requires magnesium), halting glycolysis and stabilizing glucose levels for up to 48 hours.'
    },
    {
      q: 'What is the precise blood-to-anticoagulant volumetric ratio required in 3.2% (0.109 M) buffered sodium citrate tubes for coagulation assays (PT/APTT)?',
      options: [
        '9 parts whole blood to 1 part sodium citrate (9:1 ratio)',
        '4 parts whole blood to 1 part citrate',
        '1 part whole blood to 9 parts citrate',
        '1 part whole blood to 4 parts citrate'
      ],
      explanation: 'Standard coagulation studies require exact 9:1 blood to citrate proportion; underfilling the tube leaves excess citrate that falsely prolongs PT and APTT.'
    },
    {
      q: 'What is the physiological reference interval for adult male Hemoglobin in clinical hematology?',
      options: [
        '13.0 to 17.0 g/dL',
        '8.0 to 11.0 g/dL',
        '20.0 to 25.0 g/dL',
        '5.0 to 8.0 g/dL'
      ],
      explanation: 'The standard reference interval for healthy adult males is 13.0 to 17.0 g/dL (females: 12.0 to 15.0 g/dL).'
    },
    {
      q: 'What is the biological reference interval for adult Total Leukocyte Count (TLC)?',
      options: [
        '4,000 to 11,000 per cu.mm (cells/µL)',
        '1,000 to 3,000 per cu.mm',
        '15,000 to 25,000 per cu.mm',
        '500 to 1,500 per cu.mm'
      ],
      explanation: 'Normal total white blood cell count in peripheral adult blood ranges from 4,000 to 11,000 cells/µL.'
    },
    {
      q: 'What is the normal reference interval for adult circulating blood Platelets?',
      options: [
        '1.5 to 4.5 lakh per cu.mm (150,000 to 450,000/µL)',
        '20,000 to 50,000/µL',
        '10 to 15 lakh/µL',
        '5,000 to 10,000/µL'
      ],
      explanation: 'Normal platelet count in human blood ranges from 1.5 to 4.5 x 10^5/µL (150,000–450,000/cu.mm).'
    },
    {
      q: 'In differential leukocyte counts, which cell type exhibits bilobed nuclei and coarse, bright orange-red cytoplasmic granules that do not cover the nucleus?',
      options: [
        'Eosinophil',
        'Basophil',
        'Neutrophil',
        'Monocyte'
      ],
      explanation: 'Eosinophils contain basic proteins (major basic protein, histaminase) that bind acidic eosin dye, staining bright orange-red.'
    },
    {
      q: 'Which coarse dark blue/black cytoplasmic granules in Basophils contain histamine and heparin and overlie the nucleus?',
      options: [
        'Basophilic metachromatic granules',
        'Toxic granulation',
        'Döhle bodies',
        'Auer rods'
      ],
      explanation: 'Basophil granules contain heparin, histamine, and leukotrienes, staining dark purple-black with methylene blue.'
    },
    {
      q: 'In routine urinalysis, which qualitative screening test detects ketone bodies (acetone and acetoacetic acid)?',
      options: [
        'Rothera’s sodium nitroprusside test',
        'Hay’s sulfur flower test',
        'Fouchet’s ferric chloride test',
        'Ehrlich’s aldehyde test'
      ],
      explanation: 'In alkaline conditions, acetoacetic acid and acetone react with sodium nitroprusside to produce a permanganate purple ring.'
    },
    {
      q: 'Hay’s sulfur flower test detects which abnormal constituent in human urine?',
      options: [
        'Bile salts (sodium taurocholate and glycocholate)',
        'Bile pigments (bilirubin)',
        'Urobilinogen',
        'Bence Jones protein'
      ],
      explanation: 'Bile salts lower the surface tension of urine, causing dry sulfur particles dusted on the surface to sink to the bottom.'
    },
    {
      q: 'Fouchet’s reagent (Trichloroacetic acid + 10% Ferric chloride) detects which urinary component?',
      options: [
        'Bile pigments (Bilirubin, oxidized to green biliverdin)',
        'Porphobilinogen',
        'Hemoglobin',
        'Glucose'
      ],
      explanation: 'Barium chloride precipitates urinary sulfates and bilirubin; Fouchet’s reagent oxidizes bilirubin to blue-green biliverdin.'
    },
    {
      q: 'Which precipitation/coagulation test is universally performed to confirm Bence Jones protein in multiple myeloma urine?',
      options: [
        'Precipitates upon heating between 40°C and 60°C and redissolves near 100°C',
        'Precipitates only at 100°C and remains coagulated',
        'Forms a purple ring with sodium nitroprusside',
        'Turns black in cold water'
      ],
      explanation: 'Monoclonal free light chains (Bence Jones proteins) characteristically coagulate at 40°C–60°C and clear on boiling (100°C).'
    },
    {
      q: 'What is the serological basis of the Widal agglutination test for enteric typhoid fever?',
      options: [
        'Detects serum agglutinating antibodies against Salmonella enterica serovar Typhi O (somatic) and H (flagellar) antigens',
        'Detects Shigella dysenteriae enterotoxins',
        'Measures cross-reactive Proteus OX19 antibodies',
        'Detects Streptolysin O exotoxin'
      ],
      explanation: 'Widal detects antibodies against Salmonella Typhi somatic O and flagellar H antigens; diagnostic titer is typically ≥ 1:160.'
    },
    {
      q: 'In the non-treponemal VDRL and RPR screening tests for syphilis, what antigen is utilized to detect reagin antibodies?',
      options: [
        'Cardiolipin-lecithin-cholesterol antigen emulsion',
        'Live Treponema pallidum organisms',
        'Sheep erythrocytes sensitized with amboceptor',
        'Heat-killed Corynebacteria'
      ],
      explanation: 'Reagin antibody (formed in response to lipoidal material released from damaged host cells) flocculates with cardiolipin-lecithin-cholesterol.'
    },
    {
      q: 'According to Biomedical Waste Management Guidelines, which waste category MUST be discarded exclusively in Yellow bags for high-temperature incineration?',
      options: [
        'Human anatomical waste, organ biopsies, placenta, and soiled dressings',
        'Contaminated plastic tubing, catheters, and disposable syringes without needles',
        'Metallic scalpels, needles, and sharps',
        'Broken ampoules and glass slides'
      ],
      explanation: 'Yellow color-coded non-chlorinated plastic bags are reserved for incinerable human anatomical, animal, and microbiological waste.'
    },
    {
      q: 'Contaminated recyclable plastic waste (disposable syringe barrels, IV lines, catheters) must be segregated into which colored container for autoclaving/shredding?',
      options: [
        'Red container / bin',
        'Yellow bag',
        'White puncture-proof container',
        'Blue cardboard box'
      ],
      explanation: 'Red containers receive recyclable contaminated plastics for autoclaving, chemical treatment, and subsequent shredding.'
    },
    {
      q: 'Puncture-proof, leak-proof, translucent white containers are designated for which laboratory waste items?',
      options: [
        'Contaminated metal sharps, scalpels, needles, and lancets',
        'Human organs and amputated limbs',
        'Used culture plates',
        'Chemical liquid reagents'
      ],
      explanation: 'White translucent puncture-proof containers safely hold used needles, scalpel blades, and sharps to eliminate needle-stick injuries.'
    },
    {
      q: 'What is the resolution limit of a standard brightfield compound optical microscope using an oil immersion lens and white light?',
      options: [
        'Approximately 0.2 microns (µm)',
        '2.0 microns (µm)',
        '0.001 microns (µm)',
        '10 microns (µm)'
      ],
      explanation: 'Optical resolution is governed by Abbe’s formula: d = 0.61 lambda / NA. With NA 1.25–1.40 and visible light, the limit is ~0.2 µm.'
    },
    {
      q: 'What is the physiological reference range for normal arterial blood pH?',
      options: [
        '7.35 to 7.45',
        '7.10 to 7.20',
        '7.50 to 7.65',
        '6.80 to 7.00'
      ],
      explanation: 'Normal arterial blood pH is tightly regulated between 7.35 and 7.45; values <7.35 indicate acidosis, while >7.45 indicate alkalosis.'
    },
    {
      q: 'What is the reference range for serum total calcium in healthy adults?',
      options: [
        '8.5 to 10.5 mg/dL (2.1 to 2.6 mmol/L)',
        '12.0 to 15.0 mg/dL',
        '3.0 to 5.0 mg/dL',
        '18.0 to 22.0 mg/dL'
      ],
      explanation: 'Total serum calcium ranges from 8.5 to 10.5 mg/dL; ionized physiologically active calcium represents ~50% (4.5–5.3 mg/dL).'
    }
  ];

  // Append questions into templates until pool size reaches at least 50
  for (const q of dmlt2ndYearCoreQuestions) {
    if (templates.length >= 60) break;
    templates.push(q);
  }
}
