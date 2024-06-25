import ProjectCard from "../../elements/project-card";

const Recommended = ({ projects , type }) => {
    const getPaginatedProjects = projects.slice(0, 4);

    return (
        <>
            <h2 className="font-bold text-lg capitalize opacity-80 mt-16 mb-4">recommended for you</h2>

            <div className="grid minmax-280 gap-5">
                {getPaginatedProjects.map((item, i) => (
                    <ProjectCard key={i} className='cursor-pointer' cardData={item} type={type} />
                ))}
            </div>
        </>
    );
};
export default Recommended
