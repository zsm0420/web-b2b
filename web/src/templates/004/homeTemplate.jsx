

import Carousel from "@/components/index/sections/template04/carousel";
import FtArea from "@/components/index/sections/template04/ftArea";
import OurCategories from "@/components/index/sections/template04/ourCategories";
import FeaturedProducts from "@/components/index/sections/template04/featuredProducts";
import AboutUs from "@/components/index/sections/template04/aboutUs";
import CompanyNews from "@/components/index/sections/template04/companyNews";
import CustomersSay from "@/components/index/sections/template04/customersSay";
import ContactUs from "@/components/index/sections/template04/contactUs";


export default function HomeTemplate({bannerData, featuredData, categoryData, aboutData, companyName, statsData, commentData, newsData, heroText, contactData}) {
    // 提供默认值以避免空指针错误
    const safeBannerData = bannerData || {};
    const safeFeaturedData = featuredData || [];
    const safeCategoryData = categoryData || [];
    const safeAboutData = aboutData || {};
    const safeStatsData = statsData || {};
    const safeCommentData = commentData || [];
    const safeNewsData = newsData || [];
    const safeContactData = contactData || {};
    return (
        <div className="flex flex-col">
            <div className="w-full h-[300px] md:h-[500px] lg:h-[calc(100vh-80px)]">
                <Carousel bannerData={safeBannerData} heroText={heroText}/>
            </div>




            <OurCategories categoryData={safeCategoryData}/>

            <AboutUs aboutData={safeAboutData} companyName={companyName} statsData={safeStatsData}/>

            <FeaturedProducts featuredData={safeFeaturedData}/>

            <CustomersSay commentData={safeCommentData}/>

            <CompanyNews newsData={safeNewsData}/>

            <ContactUs contactData={safeContactData} />


        </div>
    );
}
