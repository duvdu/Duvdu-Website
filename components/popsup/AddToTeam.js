
import Button from '../elements/submitButton';
import Popup from '../elements/popup';

function AddToTeam() {
    const projects = [
        {
            img: '/assets/imgs/projects/2.jpeg',
            creatives: '6',
            projectName: 'college short film project',
        },
        {
            img: '/assets/imgs/projects/3.jpeg',
            creatives: '6',
            projectName: 'my ad project',
        },
    ];

    return (
        <>
            <Popup id="add-to-team" header={'Add To Team'}>
                {projects.map((project, index) => (
                    <div key={index} className="h-20 w-full sm:w-[565px] rounded-full mt-9 relative overflow-hidden">
                        <img className="absolute -translate-y-1/2 blur-sm" src={project.img} />
                        <div className="absolute z-20 flex items-center w-full h-full p-7">
                            <div>
                                <span className="text-white whitespace-nowrap border border-opacity-20 rounded-full px-3 py-1">{project.creatives} creatives</span>
                            </div>
                            <div className="w-full text-center p-20">
                                <span className="text-white whitespace-nowrap overflow-hidden text-overflow: ellipsis capitalize">{project.projectName}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="h-[300px]" />
                <div className='px-24'>
                    <Button name="reset-password" className="w-full mb-9" shadow={true}>
                            Next
                    </Button>
                </div>
            </Popup>
        </>
    );
}

export default AddToTeam;
