import { Div, Div1, H1, Header } from "./style";
import { data } from "./data";
import Questions from "./Questions";

const FrequentlyAskedQuestions = () => {
  return (
    <Div>
      <Header className="card-header">Frequently Asked Questions(FAQs)</Header>
      <H1>How can we help you?</H1>
      <Div1>
        {data.map((item: any, idx: any) => (
          <Questions key={idx} question={item.question} answer={item.answer} />
        ))}
      </Div1>
    </Div>
  );
};

export default FrequentlyAskedQuestions;
