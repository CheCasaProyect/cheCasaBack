import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/utils/matchPassword.decorator';

export class UserDto {
  @ApiProperty({
    description: 'User fisrtname',
    example: 'CheCasa',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  firstname: string;

  @ApiProperty({
    description: 'User lastname',
    example: 'CheCasa',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  lastname: string;

  @ApiProperty({
    description: 'Birthdate',
    example: '1990-11-14',
  })
  @IsString()
  birthdate: string;

  @ApiProperty({
    description: 'User phone number',
    example: '123456789',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'User mail',
    example: 'checasa@test.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '#Checasa123',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    {
      message:
        'Password debe contener entre 8 y 15 caracteres, una mayuscula, una minuscula, un número y un caracter especial(!@#$%^&*)',
    },
  )
  password: string;

  @ApiProperty({
    description: 'User password confirmation',
    example: '#Checasa123',
  })
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  // @ApiProperty()
  // active: boolean;
}
