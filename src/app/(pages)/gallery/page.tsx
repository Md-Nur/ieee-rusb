import GalleryViewer, { Photo } from "@/components/Gallery/GalleryViewer";
import Title from "@/components/Title";
import connectDB from "@/lib/dbConnect";
import PhotosModel from "@/models/photos.model";

export const dynamic = "force-dynamic";

const GalleryPage = async () => {
  await connectDB();
  const images = await PhotosModel.find({}).sort({ date: -1 }).lean();

  const serializedImages: Photo[] = images.map((img: any) => ({
    _id: img._id.toString(),
    img: img.img,
    title: img.title,
    date: img.date
  }));

  return (
    <section className="w-full bg-base-100 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary font-black text-[10px] tracking-[0.2em] uppercase border border-primary/20">
              Visual Chronicles
           </div>
           <Title className="!my-0 !p-0">Capturing Innovation</Title>
           <p className="text-slate-500 font-medium max-w-2xl">Exploring the milestones, workshops, and vibrant community moments of the IEEE University of Rajshahi Student Branch.</p>
        </div>

        <GalleryViewer initialImages={serializedImages} />
      </div>
    </section>
  );
};

export default GalleryPage;
