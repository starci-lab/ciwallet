export interface AbstractEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export interface AccountPostgresEntity extends AbstractEntity {
  public_key: string;
  aptos_address?: string;
  claw_tickets: Array<ClawTicketPostgresEntity>;
}

export interface ClawTicketPostgresEntity extends AbstractEntity {
  is_used: boolean;
  account_id: string;
  account: AccountPostgresEntity;
}
