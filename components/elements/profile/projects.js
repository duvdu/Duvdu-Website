function Projects({ projects }) {
    return projects.length > 0 && (
        <div className='container sm:p-0 project-grid gap-[10px]'>
            {projects.map((data, index) => (
                <Project key={index} data={data} isbig={(index + 1) % 4 < 2} />
            ))}
        </div>
    )
}

const Project = ({ data, isbig }) => (
    <a href={`/project/${data._id}`} className={isbig ? 'profile-project big w-full xl:w-68%' : 'profile-project small w-48% xl:w-28%'}>
        <img className='cardimg' src={data.cover} alt='project cover' />
        <div className='creatives'>
            {data.projectBudget} $
        </div>
        <div className={`title ${isbig ? 'size-big' : 'size-small'}`}>
            {data.title}
        </div>
    </a>
);

export default Projects