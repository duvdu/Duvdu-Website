const ProjectCover = ({ data }) => {

    return (
        <img
            className="sm:rounded-[50px] w-full"
            src={data?.cover}
            alt="Project Cover"
        />
    );
}

export default ProjectCover
