import {ImageSourcePropType} from 'react-native';

export type AvatarId =
  | 'gueguense'
  | 'guardabarranco'
  | 'gigantona';

export const AVATAR_OPTIONS: {
  id: AvatarId;
  name: string;
  source: ImageSourcePropType;
}[] = [
  {
    id: 'gueguense',
    name: 'Güegüense',
    source: require('../../assets/images/perfil_gueguense.png'),
  },
  {
    id: 'guardabarranco',
    name: 'Guardabarranco',
    source: require('../../assets/images/perfil_guardabarranco.png'),
  },
  {
    id: 'gigantona',
    name: 'Gigantona',
    source: require('../../assets/images/perfil_gigantona.png'),
  },
];

export function getAvatarSource(
  avatarId: AvatarId,
): ImageSourcePropType {
  const avatar = AVATAR_OPTIONS.find(item => item.id === avatarId);

  return (
    avatar?.source ??
    require('../../assets/images/perfil_gueguense.png')
  );
}