export default function ContactPage() {
  return (
    <section className="relative bg-gradient-to-b from-indigo-50 to-white py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          Whether you have a question, feedback, or a collaboration idea, we’re
          here to listen. Choose the way you’d like to reach us:
        </p>

        {/* Contact Info */}
        <div className="space-y-10">
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">📧 Email</h2>
            <a
              href="mailto:info@example.com"
              className="text-indigo-500 hover:underline text-lg"
            >
              info@example.com
            </a>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">📞 Phone</h2>
            <a
              href="tel:+923001234567"
              className="text-indigo-500 hover:underline text-lg"
            >
              +92 300 1234567
            </a>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">🕒 Working Hours</h2>
            <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-600">Sat - Sun: Closed</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-4">🌐 Follow Us</h2>
            <div className="flex justify-center gap-6 text-lg">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 text-gray-500 text-sm">
          We aim to respond to all queries within 24 hours.
        </p>
      </div>
    </section>
  );
}
