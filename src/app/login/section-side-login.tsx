import Image from "next/image";
import MyIcon from '@/assets/undraw_authentication_tbfc.svg';

export default function SectionSide() {
    return (
        <div className='hidden lg:block bg-primary-custom rounded-tl-[40%] lg:w-1/2'>
            <div className='flex flex-col justify-between text-right h-full text-white'>
                <h1 className='font-montserrat-alternates text-2xl py-8 pr-8'>moveat</h1>
                <footer className="flex items-center justify-center">
                    <Image className="hidden lg:block" src={MyIcon} width={400} alt='Authentication Image' />
                </footer>
            </div>
        </div>
    );
};