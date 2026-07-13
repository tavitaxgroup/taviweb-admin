export interface CRMUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sale';
  created_at: string;
}

export interface CRMPipeline {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface CRMStage {
  id: string;
  pipeline_id: string;
  name: string;
  order: number;
  created_at: string;
}

export interface CRMContact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  website?: string;
  facebook_url?: string;
  source?: string;
  created_at: string;
}

export interface CRMDeal {
  id: string;
  contact_id: string;
  stage_id: string;
  assignee_id?: string;
  title: string;
  value: number;
  created_at: string;
  contact?: CRMContact; // Expanded relation
  assignee?: CRMUser; // Expanded relation
}

export interface CRMActivity {
  id: string;
  deal_id: string;
  user_id?: string;
  type: 'note' | 'email' | 'call';
  content: string;
  created_at: string;
  user?: CRMUser;
}
