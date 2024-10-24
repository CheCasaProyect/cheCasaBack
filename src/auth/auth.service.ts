import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/users.entity';
import { UserRepository } from 'src/user/user.repository';
import { FirebaseApp } from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup} from 'firebase/auth';
import { UserDto } from 'src/dtos/userDto';
import { UserRole } from 'src/utils/user.enum';
import { devNull } from 'os';
import { transporter } from 'src/config/mailer';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository,
    @Inject('FIREBASE_APP') private readonly firebaseApp: FirebaseApp    
    ) {}

    async signUp(user: UserDto){
        const {email, password} = user;
        if(!email || !password) throw new BadRequestException('Required')

        const existinUser = await this.userRepository.getUserByEmail(user.email)
        if(existinUser) throw new  BadRequestException('Email already exists') 
            
        const auth = getAuth(this.firebaseApp);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)    
            
            await this.userRepository.createUser(user);


    async login(email: string, password: string){
        const user = await this.userRepository.getUserByEmail(email)
        if(!user) throw new BadRequestException('User not found')

        const auth = await getAuth(this.firebaseApp);
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        
        return user;
    }

    async googleLogin(){
        const auth = getAuth(this.firebaseApp)
        const provider = new GoogleAuthProvider()

        const userCredential = await signInWithPopup(auth, provider);
        const { user } = userCredential;

        const existingUser = await this.userRepository.getUserByEmail(user.email)
        if(existingUser) {
            return existingUser
        }else {
            const newUser = await this.userRepository.createUser({
              email: user.email,
              firstname: '',
              lastname: '',
              phone: null,
              birthdate: null,
              role: UserRole.Traveler, 
              active: true
        })
          return newUser;
    }   
}

    async facebookLogin(){
        const auth = getAuth(this.firebaseApp);
        const provider = new FacebookAuthProvider()

        const userCredential = await signInWithPopup(auth, provider)
        const { user } = userCredential;

        const existingUser = await this.userRepository.getUserByEmail(user.email)
        if(existingUser) {
            return existingUser
        }else {
            const newUser = await this.userRepository.createUser({
              email: user.email,
              firstname: '',
              lastname: '',
              phone: null,
              birthdate: null,
              role: UserRole.Traveler, 
              active: true
        })
          return newUser;
    }   
 }

 async completeProfile(userDto: UserDto){
    const existingUser = await this.userRepository.getUserByEmail(userDto.email)
    if(!existingUser) throw new BadRequestException('User not found');

    return this.userRepository.userUpdate(existingUser.id, userDto)
 }

    await this.sendMails();

    console.log(`Mensaje enviado al gmail correctamtente`);

    return 'User created successfully!';
  }

  async sendMails() {
    await transporter.sendMail({
      from: '"Te Registraste en CheCasa 👻" <che.casa.proyect@gmail.com>',
      to: 'che.casa.proyect@gmail.com', //Es un ejemplo, luego tendría que sacar el email del usuario q se registre.
      subject: "Registro existoso",
      html: '<b>Te has registrado en la página CheCasa correctamente, ahora solo debes iniciar sesión si deseas reservar una propiedad.</b>',
    });
  }

}
