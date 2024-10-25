import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { FirebaseApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { UserDto } from 'src/dtos/userDto';
import * as bcrypt from 'bcrypt';
import { devNull } from 'os';
import { transporter } from 'src/config/mailer';
import { console } from 'inspector';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject('FIREBASE_APP') private readonly firebaseApp: FirebaseApp,
  ) {}
  

  async signUp(user: UserDto) {
    const { email, password, firstname, lastname, phone, birthdate } = user;
    if (!email || !password) throw new BadRequestException('Required');

    const existinUser = await this.userRepository.getUserByEmail(user.email);
    if (existinUser) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(user.password, 10)
    if(!hashedPassword) throw new BadRequestException('Password could not hashed');

    const auth = getAuth(this.firebaseApp);
    const userCredential = await createUserWithEmailAndPassword( auth, email, password);
    const firebaseUid = userCredential.user.uid;

    // console.log(hashedPassword);

      await this.userRepository.createUser({
        id: firebaseUid,
        email,
        password: hashedPassword,
        firstname,
        lastname,
        phone,
        birthdate,
        active: true,
      });

      return 'User created successfully!';


  }

  async login(email: string, password: string) {
    if(!email || !password)
      throw new BadRequestException('Required');

    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    
    const passwordValidation = await bcrypt.compare(password, user.password)
    if(!passwordValidation) throw new BadRequestException('Invalid Credentials')

    const auth = await getAuth(this.firebaseApp);
    const userCredential = await signInWithEmailAndPassword( auth, email, password);

    return 'Loggin successfully!';
  }



  async googleLogin() {
    const auth = getAuth(this.firebaseApp);
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const { user } = userCredential;
    const firebaseUid = user.uid;
    const existingUser = await this.userRepository.getUserByEmail(user.email);
    if (existingUser) {
      return existingUser;
    } else {
      await this.userRepository.createUser({
        id: firebaseUid,
        email: user.email,
        firstname: '',
        lastname: '',
        phone: '',
        birthdate: null,
        active: true,
      });
      return 'Loggin successfully!';
    }
  }


  async completeProfile(userDto: UserDto) {
    const existingUser = await this.userRepository.getUserByEmail(
      userDto.email,
    );
    if (!existingUser) throw new NotFoundException('User not found');

    const updateData = {
      firstname: userDto.firstname || existingUser.firstname,
      lastname: userDto.lastname || existingUser.lastname,
      phone: userDto.phone || existingUser.phone,
      birthdate: userDto.birthdate !== undefined ? userDto.birthdate : existingUser.birthdate,
    };

    return this.userRepository.userUpdate(existingUser.id, updateData);
  }
}

/* await this.sendMails();

  console.log(`Mensaje enviado al gmail correctamtente`);
  async sendMails() {
    await transporter.sendMail({
      from: '"Te Registraste en CheCasa 👻" <che.casa.proyect@gmail.com>',
      to: 'che.casa.proyect@gmail.com', //Es un ejemplo, luego tendría que sacar el email del usuario q se registre.
      subject: "Registro existoso",
      html: '<b>Te has registrado en la página CheCasa correctamente, ahora solo debes iniciar sesión si deseas reservar una propiedad.</b>',
    });
  } */
