import { PlatformConfig } from '../types';
import {
  Mail,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Hash,
  AtSign,
  Paperclip,
  Clock,
  MessageSquare,
  Video,
} from 'lucide-react';

export const platforms: PlatformConfig[] = [
  {
    id: 'gmail',
    label: 'Gmail',
    icon: Mail,
    features: ['Subject Detection', 'Formal Reply', 'Attachments', 'Signatures'],
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: Linkedin,
    features: ['Professional Networking', 'Common Experiences', 'Connection Request'],
  },
  {
    id: 'twitter',
    label: 'Twitter',
    icon: Twitter,
    maxLength: 280,
    features: ['Character Limit', 'Hashtags', 'Thread Support', 'Mentions'],
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: Instagram,
    features: ['Emoji Suggestions', 'Story/Post/DM', 'Mentions', 'Hashtags'],
  },
  {
    id: 'youtube',
    label: 'YouTube',
    icon: Youtube,
    features: ['Comment/Reply', 'Timestamps', 'Video References', 'Spam Filter'],
  },
];

export const featureIcons = {
  hashtags: Hash,
  mentions: AtSign,
  attachments: Paperclip,
  timestamp: Clock,
  comments: MessageSquare,
  video: Video,
};