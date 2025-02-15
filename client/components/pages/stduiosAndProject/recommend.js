import ProjectItem from "../home/projectItem";
import { useTranslation } from 'react-i18next';

const Recommended = ({ projects, type }) => {
    const { t } = useTranslation();
    const getPaginatedProjects = projects.slice(0, 4);

    return (
        <div className='py-10'>
            <h2 className="font-bold text-lg capitalize opacity-80  mb-4">{t("recommended for you")}</h2>

            <div className="grid minmax-280 gap-5">
                {getPaginatedProjects.map((item, i) => (
                    <ProjectItem type={type} key={item._id} cardData={item} />
                ))}
            </div>
        </div>
    );
};
export default Recommended
