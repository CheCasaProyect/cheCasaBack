import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { CarpiBotDto } from 'src/dtos/carpiBotDto';
import { CarpiBot } from 'src/entities/carpiBot.entity';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarpibotService {
  constructor(
    @InjectRepository(CarpiBot)
    private readonly carpibotRepository: Repository<CarpiBot>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private menu = [
    { id: 1, text: 'Consultas sobre Disponibilidad y Reservas' },
    { id: 2, text: 'Métodos de Pago y Facturación' },
    { id: 3, text: 'Información sobre la Propiedad y Anfitrión' },
    { id: 4, text: 'Consultas sobre Ubicación y Transporte' },
    { id: 5, text: 'Preguntas Generales y Ayuda' },
  ];

  private initialOptions = {
    '1': [
      { id: '1.1', text: 'Verificar disponibilidad de una propiedad' },
      { id: '1.2', text: '¿Cómo reservo una propiedad?' },
      { id: '1.3', text: '¿Puedo reservar por más de una semana?' },
      { id: 'back', text: 'Volver al Menú Principal' },
    ],

    '2': [
      { id: '2.1', text: 'Métodos de pago aceptados' },
      { id: '2.2', text: 'Factura y datos de la reserva' },
      { id: 'back', text: 'Volver al Menú Principal' },
    ],

    '3': [
      { id: '3.1', text: '¿Qué servicios incluye la propiedad?' },
      {
        id: '3.2',
        text: '¿El anfitrión ofrece transporte o guías turísticas?',
      },
      { id: '3.3', text: '¿Puedo contactar directamente al anfitrión?' },
      { id: 'back', text: 'Volver al Menú Principal' },
    ],

    '4': [
      { id: '4.1', text: '¿Cómo llego a la propiedad desde el aeropuerto?' },
      { id: '4.2', text: 'Ver medios de transporte cercanos' },
      { id: '4.3', text: '¿Qué atracciones turísticas hay cerca?' },
      { id: 'back', text: 'Volver al Menú Principal' },
    ],

    '5': [
      { id: '5.1', text: 'Contactar con soporte' },
      { id: '5.2', text: '¿Cómo puedo convertirme en anfitrión?' },
      { id: '5.3', text: '¿Es seguro reservar aquí?' },
      { id: 'back', text: 'Volver al Menú Principal' },
    ],
  };

  private response = {
    '1.1':
      'Para verificar la disponibilidad de una propiedad, selecciona las fechas en el calendario de la propiedad. Solo te mostraremos los días disponibles para reserva.',

    '1.2':
      'Para reservar, inicia sesión, selecciona las fechas deseadas y completa el proceso de pago. Recibirás una confirmación por correo electrónico.',

    '1.3':
      'Sí, podes reservar por varios días o semanas, según la disponibilidad de la propiedad.',

    '2.1': 'Aceptamos pagos con tarjeta de crédito y débito',

    '2.2':
      'Recibirás una correo electrónico al confirmar la reserva. Si no la recibiste, revisa tu bandeja de spam o contacta a soporte',

    '3.1':
      'Cada propiedad tiene una lista de servicios incluidos en la sección de descripción. Podes ver si cuenta con Wi-Fi, cocina, estacionamiento, etc.',

    '3.2':
      'Algunos anfitriones ofrecen servicios adicionales como transporte o tours. Revisa la página de la propiedad o contacta al anfitrión para más detalles.',

    '3.3':
      'Una vez que reserves, recibiras los datos de contacto del anfitrión.',

    '4.1':
      'Muchos anfitriones ofrecen información sobre el transporte desde el aeropuerto en la descripción de la propiedad. También podes contactar al anfitrión después de reservar para obtener detalles.',

    '4.2':
      'En el mapa de la propiedad podrás ver la ubicación exacta. Podes usarlo para identificar paradas de transporte público, estaciones de metro, y más.',

    '4.3':
      'Podes consultar el mapa en la página de la propiedad o preguntar al anfitrión para recomendaciones.',

    '5.1':
      'Nuestro equipo de soporte está disponible 24 horas al día, 7 días a la semana. Podes escribirnos acá o enviar un correo a soporte che.casa.proyect@gmail.com ',

    '5.2':
      'Si queres convertirte en anfitrión, sólo tenes que registraste como usuario y vas a tener habilitadas las opciones tanto para publicar tus propiedades como para hacer reservas para tu próximo destino. Es rápido y fácil.',

    '5.3':
      '¡Sí, nuestro sistema es seguro! Contamos con medidas de seguridad avanzadas y protección en los pagos para garantizar que tu experiencia sea segura.',
  };

  getMenu() {
    return Object.entries(this.menu).map(([key, text]) => ({ id: key, text }));
  }

  getInitialOptions(optionId: string) {
    const subMenu = this.initialOptions[optionId];
    if (!subMenu) {
      throw new BadRequestException('Opción inválida');
    }
    return subMenu;
  }

  getResponse(optionId: string) {
    const response = this.response[optionId];
    if (!response) {
      throw new BadRequestException('Opción inválida');
    }

    return response;
  }

  saveChat(carpiBotDto: CarpiBotDto): Promise<CarpiBot> {
    const chat = this.carpibotRepository.create(carpiBotDto);
    return this.carpibotRepository.save(chat);
  }

  getAllChat() {}
}
