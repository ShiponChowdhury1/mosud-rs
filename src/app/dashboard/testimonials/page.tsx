import TestimonialsManager from "@/components/dashboard/TestimonialsManager";
import { getTestimonials } from "@/actions/testimonials";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Testimonials</h1>
        <p className="text-gray-400 text-sm sm:text-base mt-1">Manage client testimonials.</p>
      </div>
      <TestimonialsManager initialTestimonials={testimonials} />
    </div>
  );
}
