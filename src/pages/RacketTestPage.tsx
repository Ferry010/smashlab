import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/racket-test/ProgressBar";
import QuestionCard from "@/components/racket-test/QuestionCard";
import ResultsView from "@/components/racket-test/ResultsView";
import { questions, scoreAnswers } from "@/lib/racketTest";

const RacketTestPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const current = questions[step];
  const topProfiles = useMemo(() => (done ? scoreAnswers(answers) : []), [done, answers]);

  const handleSelect = (optionId: string) => {
    const next = { ...answers, [current.id]: optionId };
    setAnswers(next);
    setTimeout(() => {
      if (step + 1 >= questions.length) {
        setDone(true);
      } else {
        setStep((s) => s + 1);
      }
    }, 300);
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setDone(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {done ? (
          <ResultsView topProfiles={topProfiles} onRestart={restart} />
        ) : (
          <section className="mx-auto w-full max-w-2xl px-5 pb-20 pt-8 sm:pt-12">
            <div className="mb-6 flex items-center gap-3">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-2 text-muted transition-colors hover:border-lime hover:text-lime disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Vorige vraag"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex-1">
                <ProgressBar current={step + 1} total={questions.length} />
              </div>
            </div>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                <QuestionCard
                  key={current.id}
                  question={current}
                  selected={answers[current.id]}
                  onSelect={handleSelect}
                />
              </AnimatePresence>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RacketTestPage;
