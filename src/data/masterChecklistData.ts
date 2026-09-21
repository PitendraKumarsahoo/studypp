import { MasterChecklistItem, PaperId } from '../types';

export const MASTER_CHECKLIST_ITEMS: MasterChecklistItem[] = [
  // Pathology
  {
    id: 'mc_path_1',
    category: 'pathology',
    text: 'Pathology: Can I answer all 1-mark facts without looking?'
  },
  {
    id: 'mc_path_2',
    category: 'pathology',
    text: 'Pathology: Can I write ABO/Rh grouping, DAT/IAT and cross-match procedures?'
  },
  {
    id: 'mc_path_3',
    category: 'pathology',
    text: 'Pathology: Can I explain fixation → processing → embedding → sectioning → staining?'
  },
  {
    id: 'mc_path_4',
    category: 'pathology',
    text: 'Pathology: Can I identify important special stains and their uses?'
  },

  // Microbiology
  {
    id: 'mc_micro_1',
    category: 'microbiology',
    text: 'Microbiology: Can I classify immunity, hypersensitivity, vaccines and antigen-antibody reactions?'
  },
  {
    id: 'mc_micro_2',
    category: 'microbiology',
    text: 'Microbiology: Can I write parasite morphology + life cycle + laboratory diagnosis?'
  },
  {
    id: 'mc_micro_3',
    category: 'microbiology',
    text: 'Microbiology: Can I write viral specimen collection + transport + diagnosis?'
  },
  {
    id: 'mc_micro_4',
    category: 'microbiology',
    text: 'Microbiology: Can I diagnose common fungal infections in a structured answer?'
  },

  // Biochemistry
  {
    id: 'mc_bio_1',
    category: 'biochemistry',
    text: 'Biochemistry: Can I explain glucose homeostasis and diabetes investigations?'
  },
  {
    id: 'mc_bio_2',
    category: 'biochemistry',
    text: 'Biochemistry: Can I write LFT, RFT and TFT with parameters and significance?'
  },
  {
    id: 'mc_bio_3',
    category: 'biochemistry',
    text: 'Biochemistry: Can I explain water/electrolyte balance?'
  },
  {
    id: 'mc_bio_4',
    category: 'biochemistry',
    text: 'Biochemistry: Can I answer practical/viva questions for every listed test?'
  },

  // Protocol
  {
    id: 'mc_proto_1',
    category: 'protocol',
    text: 'Every week: Re-test wrong answers after 1 day, 7 days and 21 days.'
  }
];

export interface MasterSectionItem {
  id: string;
  title: string;
}

export interface MasterSection {
  id: string;
  title: string;
  paperId?: PaperId;
  items: MasterSectionItem[];
}

export const MASTER_CHECKLIST_SECTIONS: MasterSection[] = [
  {
    id: 'sec_pathology',
    title: 'Paper I — Pathology Final Checklist',
    paperId: 'pathology',
    items: [
      { id: 'mc_path_1', title: 'Can I answer all 1-mark high-yield facts without looking?' },
      { id: 'mc_path_2', title: 'Can I write ABO/Rh grouping, DAT/IAT and cross-match procedures step-by-step?' },
      { id: 'mc_path_3', title: 'Can I explain fixation → processing → embedding → sectioning → staining sequence?' },
      { id: 'mc_path_4', title: 'Can I identify important special stains (PAS, ZN, Prussian Blue, Masson Trichrome, Oil Red O) and their diagnostic uses?' }
    ]
  },
  {
    id: 'sec_microbiology',
    title: 'Paper II — Microbiology Final Checklist',
    paperId: 'microbiology',
    items: [
      { id: 'mc_micro_1', title: 'Can I classify immunity, hypersensitivity types (I-IV), vaccines, and antigen-antibody reactions?' },
      { id: 'mc_micro_2', title: 'Can I write parasite morphology + life cycle + laboratory diagnosis (Malaria, Amoeba, Giardia, Leishmania)?' },
      { id: 'mc_micro_3', title: 'Can I write viral specimen collection + transport + diagnosis (HIV, Hepatitis B/C, Rabies)?' },
      { id: 'mc_micro_4', title: 'Can I diagnose common fungal infections (Dermatophytes, Candida, Cryptococcus) in a structured exam answer?' }
    ]
  },
  {
    id: 'sec_biochemistry',
    title: 'Paper III — Biochemistry Final Checklist',
    paperId: 'biochemistry',
    items: [
      { id: 'mc_bio_1', title: 'Can I explain glucose homeostasis, GTT procedure/curves, and diabetes mellitus investigations (HbA1c)?' },
      { id: 'mc_bio_2', title: 'Can I write Liver Function Tests (LFT), Renal Function Tests (RFT), and Thyroid Function Tests (TFT) with parameters and clinical significance?' },
      { id: 'mc_bio_3', title: 'Can I explain water and electrolyte balance (Sodium, Potassium, Chloride, Osmolality) and blood gas regulation?' },
      { id: 'mc_bio_4', title: 'Can I answer practical / viva questions for every listed analytical test and instrument principle?' }
    ]
  },
  {
    id: 'sec_protocol',
    title: 'Weekly Review & Spaced Repetition Protocol',
    items: [
      { id: 'mc_proto_1', title: 'Every week: Re-test all wrong MCQ answers after 1 day, 7 days, and 21 days for permanent recall.' },
      { id: 'mc_proto_2', title: 'Benchmark Mastery: Ensure all 14 chapters achieve green checkmarks (≥ 25/30 score) before the final university practicals.' }
    ]
  }
];
