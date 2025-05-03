'use client';

interface CallToActionProps {
  whatsappNumber: string;
}

export default function CallToAction({ whatsappNumber }: CallToActionProps) {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre os produtos da Ni Fashion.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-indigo-50 to-blue-50">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-2/3 mb-8 lg:mb-0 lg:pr-12">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-200 text-indigo-800 rounded-full mb-4">
              ATENDIMENTO EXCLUSIVO
            </span>
            <h2 className="text-3xl font-light text-gray-900 mb-4">Adicione estilo ao seu guarda-roupa</h2>
            <p className="text-gray-600 mb-6">
              Fale conosco no WhatsApp e descubra as novidades da nossa coleção. Nossa equipe está pronta para 
              ajudar você a encontrar peças que combinam com seu estilo e personalidade.
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-md inline-flex items-center transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Fale Conosco
            </button>
          </div>
          <div className="lg:w-1/3 flex justify-center">
            <div className="w-64 h-64 bg-white rounded-full shadow-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Atendimento VIP</h3>
                <p className="text-sm text-gray-600 mb-4">Nosso compromisso é com a sua satisfação</p>
                <span className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11a1 1 0 11-2 0 1 1 0 012 0zm0-3a1 1 0 01-1 1 1 1 0 01-1-1V7a1 1 0 112 0v3z" clipRule="evenodd"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 