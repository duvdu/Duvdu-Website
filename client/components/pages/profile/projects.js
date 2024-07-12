import Link from "next/link";

function getCycle(ref) {
    switch (ref) {
        case "rentals":
        case "studio-booking":
            return "studio-booking";
        default:
            return "project";
    }
}


function Projects({ projects }) {
    
    return projects?.length > 0 && (
        <div className='container sm:p-0 project-grid gap-[10px]'>
            {projects.map((data, index) => (
                <Project key={index} data={data} isbig={(index + 1) % 4 < 2} />
            ))}
        </div>
    )
}

const Project = ({ data, isbig }) => (
    <Link href={`/${getCycle(data.ref)}/${data?.project?._id}`}>
        <div className={isbig ? 'profile-project big w-full xl:w-68% cursor-pointer' : 'profile-project small w-48% xl:w-28% cursor-pointer'}>

            <img className='cardimg' src={data?.project?.cover} alt='project cover' />
            <div className='creatives'>
                {data.projectBudget} $
            </div>
            <div className={`title ${isbig ? 'size-big' : 'size-small'}`}>
                {data?.project?.title}
            </div>
        </div>

    </Link>
);

export default Projects