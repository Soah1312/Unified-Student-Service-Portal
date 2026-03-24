import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const res = await adminService.login(password);
    if (res.success) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError(res.message || 'Invalid password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)]">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 text-center mb-6">
          Admin Portal Login
        </h1>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1 flex justify-between">
              Password <span className="text-xs text-slate-500 font-normal">Hint: admin123</span>
            </label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              autoFocus
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter admin password"
            />
          </div>
          <Button type="submit" variant="primary" className="w-full py-3" isLoading={loading}>
            Login to Admin
          </Button>
        </form>
      </Card>
    </div>
  );
}
