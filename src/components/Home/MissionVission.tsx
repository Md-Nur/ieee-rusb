import Title from "../Title";

const MissionVission = () => {
  return (
    <section className="max-w-7xl mx-auto px-3 md:px-10 text-justify my-3">
      {/* <div className="flex gap-10 flex-col md:flex-row"> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <p>
          <Title>Our Vision</Title>
          To build IEEE RU SB as a leading center of academic excellence and
          technological innovation in Bangladesh—where students grow as skilled
          engineers, responsible professionals, and impactful leaders capable of
          contributing to global technological progress.
        </p>
        <p>
          <Title>Our Mission</Title>
          <ul className="list-disc list-inside">
            <li>To inspire students to explore, innovate, and excel in emerging technological fields.</li>
            <li>To connect members with global IEEE communities, resources, and opportunities.</li>
            <li>To promote ethical engineering practices and contribute positive solutions to societal challenges.</li>
            <li>To foster a culture of collaboration, continuous learning, and professional development.</li>
          </ul>
        </p>
      </div>
    </section>
  );
};

export default MissionVission;
