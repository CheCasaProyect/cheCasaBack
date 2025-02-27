import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly authService: AuthService) {
        super({
            clientID: process.env.GOOGLE_ID_CLIENT,
            clientSecret: process.env.GOOGLE_SECRET_CLIENT,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile'],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
        const user = await this.authService.validateUser(profile);
        return done(null, user || false);
    }
}