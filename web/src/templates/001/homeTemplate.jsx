import Carousel from "@/components/index/sections/template01/carousel";
import FeaturedProducts from "@/components/index/sections/template01/featuredProducts";
import FacilityArea from "@/components/index/sections/facilityArea";
import OurCategories from "@/components/index/sections/template01/ourCategories";
import AboutUs from "@/components/index/sections/aboutUs";
import CustomersSay from "@/components/index/sections/customersSay";
import CompanyNews from "@/components/index/sections/companyNews";

export default function HomeTemplate({bannerData, featuredData, categoryData, aboutData, companyName, statsData, commentData, newsData}) {
    // 提供默认值以避免空指针错误
    const safeBannerData = bannerData || {};
    const safeFeaturedData = featuredData || [];
    const safeCategoryData = categoryData || [];
    const safeAboutData = aboutData || {};
    const safeStatsData = statsData || {};
    const safeCommentData = commentData || [];
    const safeNewsData = newsData || [];
    return (
        <div className="flex flex-col">
            <div className="w-full h-[200px] md:h-[300px] lg:h-[600px]">
                <Carousel bannerData={safeBannerData}/>
            </div>

            <FeaturedProducts featuredData={safeFeaturedData}/>

            <OurCategories categoryData={safeCategoryData}/>

            <AboutUs aboutData={safeAboutData} companyName={companyName} statsData={safeStatsData}/>

            <CustomersSay commentData={safeCommentData}/>

            <CompanyNews newsData={safeNewsData}/>

            <FacilityArea/>
        </div>
    );
}
