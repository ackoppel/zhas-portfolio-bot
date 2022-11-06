import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entity/address.entity';
import { In, Repository } from 'typeorm';
import { AddressStatus } from './enum/addressStatus.enum';
import { Chain } from '../chain/entity/chain.entity';

interface INeedsReply {
  message_to_reply: number;
}

interface IIsReply {
  prev_message_to_reply: number;
}

export interface IAddressOwner {
  chat_id: number;
  user_id: number;
}

export interface IAddAddress extends IAddressOwner, INeedsReply {}

export interface IAddAddressChain extends IAddressOwner, INeedsReply, IIsReply {
  chain: Chain;
}

export interface IAddAddressContract extends IAddressOwner, IIsReply {
  contract_address: string;
}

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ) {}

  async addAddress(data: IAddAddress): Promise<Address> {
    const addressEntity = this.addressRepo.create({
      ...data,
      status: AddressStatus.addChain,
    });
    return this.addressRepo.save(addressEntity);
  }

  async addChain(data: IAddAddressChain): Promise<Address> {
    const { chat_id, user_id, message_to_reply, chain, prev_message_to_reply } =
      data;
    const addressEntity = await this.addressRepo.findOne({
      chat_id,
      user_id,
      message_to_reply: prev_message_to_reply,
      status: AddressStatus.addChain,
    });
    const mergedModel = this.addressRepo.merge(addressEntity, {
      message_to_reply,
      chain,
      status: AddressStatus.addAddress,
      updated_at: new Date(),
    });
    return this.addressRepo.save(mergedModel);
  }

  async addContract(data: IAddAddressContract): Promise<Address> {
    const { chat_id, user_id, contract_address, prev_message_to_reply } = data;
    const addressEntity = await this.addressRepo.findOne({
      chat_id,
      user_id,
      status: AddressStatus.addAddress,
      message_to_reply: prev_message_to_reply,
    });
    const mergedModel = this.addressRepo.merge(addressEntity, {
      contract_address,
      status: AddressStatus.done,
      message_to_reply: null,
      updated_at: new Date(),
    });
    return this.addressRepo.save(mergedModel);
  }

  async isDuplicateAddress(
    contract_address: string,
    chat_id: number,
    user_id: number,
    chain: Chain,
  ): Promise<boolean> {
    const existingAddress = await this.addressRepo.findOne({
      chat_id,
      user_id,
      contract_address,
      chain,
    });
    return !!existingAddress;
  }

  async getUnfinishedAddressIfExists(
    chat_id: number,
    user_id: number,
  ): Promise<Address> {
    return this.addressRepo.findOne({
      chat_id,
      user_id,
      status: In([AddressStatus.addAddress, AddressStatus.addChain]),
    });
  }
}
