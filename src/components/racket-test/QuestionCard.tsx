import { motion } from "framer-motion";
import OptionCard from "./OptionCard";
import type { Question } from "@/lib/racketTest";

interface Props {
  question: Question;
  selected?: string;
  onSelect: (optionId: string) => void;
}

const QuestionCard = ({ question, selected, onSelect }: Props) => (
  <motion.div
    key={question.id}
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className="w-full"
  >
    <h2 className="font-display text-3xl uppercase leading-tight text-foreground sm:text-4xl">
      {question.title}
    </h2>
    <div className="mt-8 flex flex-col gap-3">
      {question.options.map((opt) => (
        <OptionCard
          key={opt.id}
          emoji={opt.emoji}
          label={opt.label}
          sublabel={opt.sublabel}
          selected={selected === opt.id}
          onClick={() => onSelect(opt.id)}
        />
      ))}
    </div>
  </motion.div>
);

export default QuestionCard;
