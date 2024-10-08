import { Container, Title, Accordion } from "@mantine/core";
import { data } from "./data";
import Layout from "../../components/Layout";

const FAQ = () => {
  return (
    <Layout>
      <Container
        size="sm"
        className="flex-grow w-full justify-center items-center py-8 md:py-52"
      >
        <Title className="text-center text-gray-100 mb-4">
          Frequently Asked Questions
        </Title>

        <Accordion data-cy="faq" variant="separated">
          {data.map((d, index) => (
            <Accordion.Item
              data-cy={`faq-item-${index}`}
              key={index}
              value={d.value}
            >
              <Accordion.Control>{d.question}</Accordion.Control>
              <Accordion.Panel>{d.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </Layout>
  );
};

export default FAQ;
