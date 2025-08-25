import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-pastel-pink to-dusty-rose-100">
      <div className="text-center px-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <Construction className="w-12 h-12 text-dusty-rose-600" />
        </div>

        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-deep-emerald-800 mb-4">
          {title}
        </h1>

        <p className="text-gray-600 text-lg mb-2">This page is coming soon!</p>

        <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
          We're working hard to bring you this section. In the meantime,
          continue exploring our homepage or contact us directly for any
          questions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            variant="outline"
            className="border-deep-emerald-600 text-deep-emerald-600 hover:bg-deep-emerald-600 hover:text-white"
          >
            <Link to="/" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white"
          >
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
