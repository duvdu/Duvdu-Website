
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { Link } from 'react-scroll';
import { Swiper, SwiperSlide } from 'swiper/react';
import DraggableList from '../pages/home/dragList';
import { useTranslation } from 'react-i18next';

const RelatedCategories = ({ className, NeedTranslate = true, categories }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const cycle = router.pathname.substring(1)

    const allTags = categories
        // .filter(item => item.cycle === cycle)
        .flatMap(item =>
            item.subCategories.flatMap(subCategory =>
                subCategory.tags.map(tag => tag)
            )
        );

    return (
        <div className={className + (NeedTranslate ? " h-26 -translate-y-8" : "")}>
            <h2 className="opacity-70 font-semibold text-lg lg:mt-6 capitalize">{t("related categories")}</h2>
            <div className="mt-4 relative">
                <DraggableList>
                    {allTags.map((item, index) =>
                        <div className='mr-3 w-[250px]'>
                            <Link key={item._id} href={`/${cycle}?tag=${item._id}`}>
                                <div className={`flex flex-col items-center justify-around border hover:border-2 border-[#1A73EBB2] rounded-3xl w-full py-2 cursor-pointer`}>
                                    <span className="text-primary text-lg font-semibold opacity-80 capitalize my-3">{item.title}</span>
                                    <span className="text-base font-medium opacity-50 capitalize hidden">{item.count} creative</span>
                                </div>
                            </Link>
                        </div>
                    )}
                </DraggableList>
                
                
            </div>
        </div>
    );
}


const mapStateToProps = (state) => ({
    categories: state.categories
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(RelatedCategories);