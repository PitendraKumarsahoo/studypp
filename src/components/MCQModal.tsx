import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Award,
  Sparkles,
  Lightbulb,
  HelpCircle
} from 'lucide-react';
import { MCQQuestion, Topic, PaperId } from '../types';
import { getQuestionsForTopic } from '../data/mcqGenerator';
import { recordTestAttempt } from '../utils/progress';

interface MCQModalProps {
  topic: Topic | null;
  chapterTitle: string;
  paperTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onTestCompleted: () => void;
}

type TestPhase = 'confirm' | 'testing' | 'result' | 'review';

export const MCQModal: React.FC<MCQModalProps> = ({
  topic,
  chapterTitle,
  paperTitle,
  isOpen,
  onClose,
  onTestCompleted
}) => {
  const [phase, setPhase] = useState<TestPhase>('confirm');
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState<number>(0);
  const [showUnansweredConfirm, setShowUnansweredConfirm] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && topic) {
      setPhase('confirm');
      setCurrentIndex(0);
      setUserAnswers(new Array(30).fill(null));
      setScore(0);
      setShowUnansweredConfirm(false);
      // Generate exactly 30 unique questions for this topic
      const generated = getQuestionsForTopic(topic);
      setQuestions(generated);
    }
  }, [isOpen, topic]);

  if (!isOpen || !topic) return null;

  const handleStartTest = () => {
    const generated = getQuestionsForTopic(topic);
    setQuestions(generated);
    setUserAnswers(new Array(generated.length).fill(null));
    setCurrentIndex(0);
    setPhase('testing');
  };

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...userAnswers];
    updated[currentIndex] = optionIndex;
    setUserAnswers(updated);
  };

  const answeredCount = userAnswers.filter((a) => a !== null).length;
  const unansweredCount = questions.length - answeredCount;

  const handleSubmitTest = () => {
    if (unansweredCount > 0 && !showUnansweredConfirm) {
      setShowUnansweredConfirm(true);
      return;
    }

    let calculatedScore = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    recordTestAttempt(
      topic.paperId as PaperId,
      topic.chapterId,
      topic.id,
      topic.title,
      chapterTitle,
      paperTitle,
      calculatedScore,
      questions.length
    );

    onTestCompleted();
    setPhase('result');
    setShowUnansweredConfirm(false);
  };

  const isPassed = score >= 25;
  const percentage = Math.round((score / 30) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-sm border border-indigo-100">
              {paperTitle}
            </span>
            <span className="text-xs text-slate-600 truncate max-w-[240px] md:max-w-[320px]">
              {chapterTitle}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body depending on Phase */}
        <div className="p-5 md:p-6 overflow-y-auto flex-1">
          {/* 1. CONFIRM PHASE */}
          {phase === 'confirm' && (
            <div className="text-center py-4 space-y-5">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                <BookOpen className="w-7 h-7" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">30 MCQ Practice Test</h2>
                <p className="text-sm font-medium text-indigo-600 mt-1 max-w-lg mx-auto">
                  {topic.title}
                </p>
              </div>

              <div className="max-w-md mx-auto bg-slate-50 rounded-xl p-4 border border-slate-200 text-left space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center justify-between py-1 border-b border-slate-200">
                  <span className="font-medium text-slate-700">Total Questions:</span>
                  <span className="font-bold text-slate-900">30 MCQs</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-200">
                  <span className="font-medium text-slate-700">Passing Requirement:</span>
                  <span className="font-bold text-emerald-700">25 / 30 (83.3% or higher)</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="font-medium text-slate-700">Completion Rule:</span>
                  <span className="font-bold text-indigo-700">Permanent green checkmark upon passing</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Once you score <strong>25 or higher</strong>, this topic will officially unlock and be marked as completed on your dashboard. You can retake the test as many times as needed until you pass.
              </p>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  id="btn-start-30-mcq-test"
                  onClick={handleStartTest}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors flex items-center gap-2"
                >
                  <span>Start 30 MCQ Test</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 2. TESTING PHASE */}
          {phase === 'testing' && questions.length > 0 && (
            <div className="space-y-4">
              {/* Progress & Counter Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-indigo-700">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="text-slate-600">
                    Answered: {answeredCount} / {questions.length}
                  </span>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                    style={{
                      width: `${((currentIndex + 1) / questions.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Topic Subtitle */}
              <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs text-slate-700 flex items-center justify-between">
                <span className="truncate font-medium">{topic.title}</span>
                <span className="text-[11px] text-slate-600 shrink-0 ml-2">Pass mark: 25/30</span>
              </div>

              {/* Current Question */}
              <div className="pt-2">
                <h3 className="text-base md:text-lg font-semibold text-slate-900 leading-snug">
                  {questions[currentIndex].question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5 pt-1">
                {questions[currentIndex].options.map((option, optIdx) => {
                  const isSelected = userAnswers[currentIndex] === optIdx;
                  const hasAnswered = userAnswers[currentIndex] !== null;
                  const isCorrectAnswer = optIdx === questions[currentIndex].correctAnswer;
                  const isUserCorrect = isSelected && isCorrectAnswer;
                  const isUserWrong = isSelected && !isCorrectAnswer;
                  const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                  let buttonStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
                  let badgeStyle = 'bg-slate-100 text-slate-600 border border-slate-200';

                  if (hasAnswered) {
                    if (isUserCorrect) {
                      buttonStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-semibold ring-2 ring-emerald-200';
                      badgeStyle = 'bg-emerald-600 text-white font-bold';
                    } else if (isUserWrong) {
                      buttonStyle = 'border-rose-500 bg-rose-50/80 text-rose-950 font-semibold ring-2 ring-rose-200';
                      badgeStyle = 'bg-rose-600 text-white font-bold';
                    } else if (isCorrectAnswer) {
                      buttonStyle = 'border-emerald-400 bg-emerald-50/50 text-emerald-900 border-dashed font-medium';
                      badgeStyle = 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold';
                    } else {
                      buttonStyle = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
                      badgeStyle = 'bg-slate-100 text-slate-400 border border-slate-200';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 text-sm cursor-pointer ${buttonStyle}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${badgeStyle}`}
                      >
                        {letter}
                      </span>
                      <span className="flex-1 pt-0.5 leading-relaxed">{option}</span>

                      {/* Real-time feedback status badge */}
                      {hasAnswered && isUserCorrect && (
                        <span className="shrink-0 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Correct</span>
                        </span>
                      )}
                      {hasAnswered && isUserWrong && (
                        <span className="shrink-0 text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>Incorrect</span>
                        </span>
                      )}
                      {hasAnswered && !isSelected && isCorrectAnswer && (
                        <span className="shrink-0 text-xs font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Correct Option</span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Educational Explanation Card */}
              {userAnswers[currentIndex] !== null && (
                <div
                  className={`p-4 rounded-xl border text-xs space-y-2 animate-fadeIn transition-all ${
                    userAnswers[currentIndex] === questions[currentIndex].correctAnswer
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                      : 'bg-amber-50/80 border-amber-300 text-amber-950'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>
                        {userAnswers[currentIndex] === questions[currentIndex].correctAnswer
                          ? 'Educational Explanation (Correct Choice):'
                          : `Educational Explanation (Correct Option: ${String.fromCharCode(
                              65 + questions[currentIndex].correctAnswer
                            )}):`}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      2nd Year DMLT Concept
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-800 bg-white/90 p-3 rounded-lg border border-slate-200">
                    {questions[currentIndex].explanation}
                  </p>
                </div>
              )}

              {/* Unanswered warning modal strip */}
              {showUnansweredConfirm && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      You have <strong>{unansweredCount} unanswered questions</strong>. Submit anyway?
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowUnansweredConfirm(false)}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-amber-300 rounded-lg hover:bg-amber-100 text-amber-900"
                    >
                      Keep Answering
                    </button>
                    <button
                      onClick={handleSubmitTest}
                      className="px-2.5 py-1 text-[11px] font-bold bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                    >
                      Submit Now
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Nav Controls with ALWAYS-VISIBLE Submit Button */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2 flex-wrap sm:flex-nowrap">
                {/* Left: Previous Button */}
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {/* Center: Scrollable Quick Jump Pills */}
                <div className="hidden sm:flex gap-1 overflow-x-auto max-w-[200px] md:max-w-[260px] py-1 px-1">
                  {questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-6 h-6 rounded-md text-[10px] font-semibold shrink-0 transition-colors ${
                        currentIndex === i
                          ? 'bg-indigo-600 text-white'
                          : userAnswers[i] !== null
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      title={`Question ${i + 1}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                {/* Right Group: Next and ALWAYS-VISIBLE Submit Test Button */}
                <div className="flex items-center gap-2 ml-auto">
                  {currentIndex < questions.length - 1 && (
                    <button
                      onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                      className="px-3.5 py-2 text-xs font-bold rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Always show submit button on all questions */}
                  <button
                    id="btn-always-submit-mcq"
                    onClick={handleSubmitTest}
                    className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-colors shadow-xs"
                    title="Submit test at any time"
                  >
                    <span>Submit Test ({answeredCount}/30)</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. RESULT PHASE */}
          {phase === 'result' && (
            <div className="text-center py-4 space-y-6">
              {isPassed ? (
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Passing Score Achieved
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 mt-2">🎉 TEST PASSED</h2>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                    <XCircle className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                      Passing Score Not Met
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 mt-2">❌ TEST NOT PASSED</h2>
                  </div>
                </div>
              )}

              {/* Large Score Card */}
              <div
                className={`max-w-md mx-auto p-5 rounded-2xl border text-center shadow-xs ${
                  isPassed
                    ? 'bg-gradient-to-b from-emerald-50/50 to-white border-emerald-200'
                    : 'bg-gradient-to-b from-rose-50/50 to-white border-rose-200'
                }`}
              >
                <div className="text-xs text-slate-600 uppercase tracking-wider font-semibold">
                  Your Score
                </div>
                <div
                  className={`text-4xl font-black my-1 ${
                    isPassed ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {score} <span className="text-xl font-bold text-slate-600">/ 30</span>
                </div>
                <div className="text-xs font-medium text-slate-600">
                  Percentage: <strong>{percentage}%</strong> • Required:{' '}
                  <strong>25 / 30 (83.3%)</strong>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-xs">
                  <span className="font-semibold text-slate-700">Status:</span>
                  {isPassed ? (
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> ✓ COMPLETED
                    </span>
                  ) : (
                    <span className="font-bold text-rose-600 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> NOT COMPLETED
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 mt-2">
                  {isPassed
                    ? 'Topic completed successfully. The green checkmark is now unlocked on your dashboard!'
                    : 'You need at least 25 correct answers to complete this topic. Review your answers and retake the test!'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {!isPassed && (
                  <button
                    id="btn-retake-mcq-test"
                    onClick={handleStartTest}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake MCQ</span>
                  </button>
                )}

                <button
                  onClick={() => setPhase('review')}
                  className="px-5 py-2.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Review Questions</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors"
                >
                  Back to Topics
                </button>
              </div>
            </div>
          )}

          {/* 4. REVIEW QUESTIONS PHASE */}
          {phase === 'review' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Question Review</h3>
                  <p className="text-xs text-slate-600">
                    Score: <strong>{score}/30</strong> ({percentage}%) • Showing all 30 questions with explanations
                  </p>
                </div>
                <div className="flex gap-2">
                  {!isPassed && (
                    <button
                      onClick={handleStartTest}
                      className="px-3 py-1.5 text-xs font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Retake</span>
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                  >
                    Back to Topics
                  </button>
                </div>
              </div>

              {/* List of 30 questions with explanations */}
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const userAnswerIndex = userAnswers[idx];
                  const isCorrect = userAnswerIndex === q.correctAnswer;
                  const answered = userAnswerIndex !== null;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border text-left text-xs space-y-2.5 transition-colors ${
                        isCorrect
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-rose-50/40 border-rose-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-slate-900 text-sm">
                          {idx + 1}. {q.question}
                        </span>
                        {isCorrect ? (
                          <span className="shrink-0 font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="shrink-0 font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md flex items-center gap-1 text-[11px]">
                            <XCircle className="w-3.5 h-3.5" /> {answered ? 'Incorrect' : 'Unanswered'}
                          </span>
                        )}
                      </div>

                      {/* Options breakdown */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 pt-1">
                        {q.options.map((opt, oIdx) => {
                          const isOptionCorrect = oIdx === q.correctAnswer;
                          const isUserPick = oIdx === userAnswerIndex;

                          let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
                          if (isOptionCorrect) {
                            badgeStyle = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-semibold';
                          } else if (isUserPick) {
                            badgeStyle = 'bg-rose-100 text-rose-900 border-rose-300 font-semibold';
                          }

                          return (
                            <div
                              key={oIdx}
                              className={`p-2 rounded-lg border text-xs flex items-center gap-2 ${badgeStyle}`}
                            >
                              <span className="w-5 h-5 rounded-md bg-white/80 border border-slate-300 flex items-center justify-center text-[10px] font-bold">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span className="truncate">{opt}</span>
                              {isOptionCorrect && (
                                <span className="ml-auto text-[10px] text-emerald-800 font-bold">
                                  ✓ Correct
                                </span>
                              )}
                              {isUserPick && !isOptionCorrect && (
                                <span className="ml-auto text-[10px] text-rose-800 font-bold">
                                  Your Choice
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Clinical explanation */}
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-slate-600 leading-relaxed text-[11px]">
                        <strong className="text-slate-800 block mb-0.5">High-Yield Explanation:</strong>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
