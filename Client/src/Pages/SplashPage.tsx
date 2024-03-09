import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import CountdownTimer from "../Components/Common/CountdownTimer";
import AccordionItem from "../Components/Common/AccordionItem";

const SplashPage = () => {
  const accordionData = [
    {
      title: "Background",
      content:
        "University campuses are much more than a ground for learning, they are a place where students from all walks of life come together with a goal of bettering themselves for their futures and making valuable connections along the way. However, despite the advancements in technology, we believe that there is a gap for online interconnectivity between the society and the students involved.",
    },
    {
      title: "Problem",
      content:
        "When a student enrols in a new university, regardless of the interests they might have, many can find it difficult finding their place and making connections with other students. They might have a myriad of hobbies that they would like talk about with others and potentially there already exists a society or two that accommodates that connection. However, with today's online information overload it may be difficult for them to not only ‘browse’ the potential societies, but also to know when events for them will be happening. This leads to less interactivity with the university, and fewer overall connections made throughout their educational lifetime.",
    },
    {
      title: "Goals and Objectives",
      content:
        "UniSphere aims to streamline that experience, providing students with a catalogue of joinable societies, and ease of access to viewing a channel list of upcoming societal events. This web application will pride itself with easily interfaceable design, allowing for students who might have been too socially anxious (or socially unaware), to have the same communal opportunities as their peers. Furthermore, we aim to simplify the management and promotion of society events and activities, encouraging greater overall participation and engagement across the university community.",
    },
  ];

  return (
    <div className="flex justify-center items-center h-screen glowing-background font-arimo">
      <div className="text-center">
        <motion.div
          className="logo-container mb-4"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <GlobeAltIcon className="w-14 h-14 mx-auto text-luni-black" />
        </motion.div>
        <h1 className="text-3xl font-bold text-luni-black -mt-2 font-montserrat">
          U N I S P H E R E
        </h1>
        {/* Countdown Timer */}
        <div className="font-montserrat">
          <CountdownTimer targetDate="2024-05-03" />
        </div>
        {/* Accordion */}
        <div className="w-full max-w-2xl mx-auto p-4">
          {" "}
          {/* Container to control width */}
          {accordionData.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
