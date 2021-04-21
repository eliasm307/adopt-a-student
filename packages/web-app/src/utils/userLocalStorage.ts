interface GetProps {
  key: string;
  uid: string;
}

interface SetProps extends GetProps {
  value: string;
}

const createUserKey = ({ uid, key }: GetProps) => `${uid}-${key}`;

export const setUserLocalStorageItem = (props: SetProps) => {
  const { uid, value } = props;
  if (!uid) return;
  const userKey = createUserKey(props);
  localStorage.setItem(userKey, value);
};

export const getUserLocalStorageItem = (props: GetProps) => {
  const userKey = createUserKey(props);
  return localStorage.getItem(userKey);
};
