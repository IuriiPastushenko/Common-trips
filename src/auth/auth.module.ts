import { Module } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@app/auth/local.strategy';
import { CustomerEntity } from '@app/customers/entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity]), PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
