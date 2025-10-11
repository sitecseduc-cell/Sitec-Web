// src/components/auth/LoginComponent.tsx
import React, { useState, useCallback } from 'react';
import { User } from '../../types'; // Importe o tipo

interface LoginComponentProps {
  onViewChange: (view: string) => void;
  onLogin: (user: User) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onViewChange, onLogin }) => {
  // ...toda a lógica do componente de login aqui
};

export default LoginComponent;