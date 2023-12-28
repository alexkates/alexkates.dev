import ProjectCarousel from "./project-carousel";

function ProjectSection() {
  return (
    <div className="mt-8 flex flex-col gap-2 items-center">
      <div className="flex items-center text-xl w-full">
        <span className="font-medium">Work I&apos;m proud of</span>
      </div>
      <ProjectCarousel />
    </div>
  );
}

export default ProjectSection;
