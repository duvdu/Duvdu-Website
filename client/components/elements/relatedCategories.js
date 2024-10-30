
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import DraggableList from '../pages/home/dragList';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const RelatedCategories = ({ className, NeedTranslate = true, categories }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { category}=router.query
    const cycle = router.pathname.substring(1)
    const categoriesInCycle = category? categories.filter(cat => cat._id === category) : categories.filter(cat => cat.cycle === cycle);
    const subCategories = categoriesInCycle.flatMap(cat => cat.subCategories) || [];

    const allTags = categories
        // .filter(item => item.cycle === cycle)
        .flatMap(item =>
            item.subCategories.flatMap(subCategory =>
                subCategory.tags.map(tag => tag)
            )
        );

    return (
        <div className={className + (NeedTranslate ? " h-26 -translate-y-8" : "")}>
            <h2 className="opacity-70 font-semibold text-lg lg:mt-6 capitalize">{t("Related subCategories")}</h2>
            <div className="mt-4 relative">
                <DraggableList>
                    {subCategories.map((item, index) =>
                        <Link href={`/${cycle}?subCategory=${item._id}`} key={index}>
                            <div className='mr-3 w-[250px]'>
                                <div className={`flex flex-col items-center justify-around border hover:border-2 border-[#1A73EBB2] rounded-3xl w-full py-2 cursor-pointer`}>
                                    <span className="text-primary text-lg font-semibold opacity-80 capitalize my-3">{item.title}</span>
                                    {/* <span className="text-base font-medium opacity-50 capitalize hidden">{item.count} creative</span> */}
                                </div>
                            </div>
                        </Link>
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