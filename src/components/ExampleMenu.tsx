import React, { useState } from "react";
import { Observe } from "../hooks/observe";
import { Post } from "../hooks/post";
import { useVisibility } from "../context/VisibilityContext";
import { motion, AnimatePresence } from "motion/react";

interface PlayerData {
  name: string;
  job: string;
  bank: number;
  id: number;
}

const ExampleMenu: React.FC = () => {
  const { visible, setVisible } = useVisibility();
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  Observe("setPlayerData", (data: PlayerData) => {
    setPlayerData(data);
  });

  const handleClose = async () => {
    try {
      await Post.create("closeMenu");
      setVisible(false);
    } catch (err) {
      console.error("Erro ao fechar menu", err);
      setVisible(false);
    }
  };

  const handleClaimReward = async () => {
    if (!playerData) return;
    const resp = await Post.create("claimReward", { id: playerData.id }, { status: "success", msg: "Você resgatou sua recompensa diária!" });
    alert(resp.msg);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center h-screen w-screen bg-[#0a0a0b]/80 backdrop-blur-[2px]"
        >
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-[#1c1c1e] text-white p-0 rounded-[24px] shadow-2xl w-[380px] flex flex-col overflow-hidden border border-white/5"
          >
            {/* Header / Avatar Section */}
            <div className="bg-[#2c2c2e] p-8 flex flex-col items-center gap-4 relative">
               <button 
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 transition-colors"
              >
                ✕
              </button>

              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg shadow-blue-500/20">
                {playerData ? playerData.name.charAt(0) : "?"}
              </div>
              
              <div className="text-center">
                <h1 className="text-xl font-semibold tracking-tight">
                  {playerData ? playerData.name : "Carregando..."}
                </h1>
                <p className="text-sm text-gray-400">
                  {playerData ? playerData.job : "Sincronizando..."}
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col gap-4">
              {playerData ? (
                <>
                  <div className="flex flex-col gap-1 px-2">
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="text-gray-500 text-sm">Identidade</span>
                      <span className="font-medium">#{playerData.id}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="text-gray-500 text-sm">Conta Bancária</span>
                      <span className="font-bold text-green-400">
                        ${playerData.bank.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 text-sm">Status da Conta</span>
                      <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-md font-medium uppercase tracking-wider">
                        Ativa
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={handleClaimReward}
                    className="mt-2 bg-white text-black hover:bg-gray-200 font-semibold py-3.5 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-white/5"
                  >
                    Resgatar Presente do Dia
                  </button>

                  <p className="text-[11px] text-center text-gray-500 mt-2">
                    Bem-vindo de volta! Aproveite seu dia na cidade.
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center py-12 gap-4">
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span className="text-xs text-gray-500 font-medium">Buscando informações...</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExampleMenu;
