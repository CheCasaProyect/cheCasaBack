import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const setupSwagger = (app: INestApplication) => {
    const SwaggerConfig = new DocumentBuilder()
    .setTitle('Che!Casa')
    .setDescription(
      ` 
  ##Descripción:

      Che!Casa es una plataforma de búsqueda y publicación de alojamiento en Argentina. 
      Nuestra aplicación permite a los usuarios explorar una variedad de opciones de alojamiento, 
      desde apartamentos hasta casas rurales, facilitando la planificación de sus viajes.
      
  ##Funcionalidades Principales:

      **Búsqueda de Alojamiento:** Los viajeros pueden buscar y filtrar alojamientos según diferentes criterios, 
      como ubicación, tipo de propiedad, precio y comodidades.

      **Publicación de Propiedades:** Los propietarios pueden crear anuncios de sus propiedades, 
      incluyendo detalles como fotos, descripciones, precios y disponibilidad.

      **Gestión de Reservas:** Los usuarios pueden reservar propiedades y gestionar sus reservas desde la plataforma.

      **Perfiles de Usuario:** Tanto viajeros como propietarios pueden crear y gestionar sus perfiles, 
      incluyendo historial de reservas y propiedades publicadas.
      
   ##Objetivos:

       **Che!Casa** busca simplificar la experiencia de encontrar y ofrecer alojamiento en Argentina, 
       promoviendo una comunidad activa de viajeros y anfitriones. 
       Nuestra API proporciona todos los recursos necesarios para interactuar con la plataforma, 
       permitiendo una integración sencilla y eficiente.`,
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api', app, document);

}