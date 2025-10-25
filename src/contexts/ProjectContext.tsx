import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Room, RoomItem, ELECTRICAL_CATALOG, ItemGroup } from '../types/project';
import { useAuth } from './AuthContext';
import { API_BASE_URL } from '../config/api';

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  createProject: (name: string, type: Project['type'], description?: string) => Project;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  saveProjectNow: () => Promise<void>;
  addRoom: (projectId: string, room: Omit<Room, 'id' | 'items'>) => void;
  addRoomFromTemplate: (projectId: string, templateType: 'bucatarie' | 'baie' | 'dormitor' | 'living') => void;
  updateRoom: (projectId: string, roomId: string, updates: Partial<Room>) => void;
  deleteRoom: (projectId: string, roomId: string) => void;
  addItemToRoom: (projectId: string, roomId: string, item: Omit<RoomItem, 'id'>) => void;
  updateRoomItem: (projectId: string, roomId: string, itemId: string, updates: Partial<RoomItem>) => void;
  deleteRoomItem: (projectId: string, roomId: string, itemId: string) => void;
  createGroup: (projectId: string, roomId: string, name: string, itemIds: string[]) => void;
  updateGroup: (projectId: string, roomId: string, groupId: string, updates: Partial<ItemGroup>) => void;
  deleteGroup: (projectId: string, roomId: string, groupId: string) => void;
  getTotalPrice: (projectId: string) => number;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [history, setHistory] = useState<Project[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [serverProjectIds, setServerProjectIds] = useState<Map<string, number>>(new Map());

  // Load projects from server or localStorage on mount
  useEffect(() => {
    if (isAuthenticated && token) {
      // Load from server
      fetch(`${API_BASE_URL}/projects`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.projects && data.projects.length > 0) {
            const serverProjects = data.projects.map((p: any) => ({
              id: `server-${p.id}`,
              name: p.name,
              type: p.type,
              description: p.data.description,
              rooms: p.data.rooms || [],
              metadata: p.data.metadata, // Include metadata from server
              createdAt: new Date(p.created_at),
              updatedAt: new Date(p.updated_at),
              status: 'draft' as const,
            }));

            // Map server IDs to local IDs
            const idMap = new Map<string, number>();
            data.projects.forEach((p: any) => {
              idMap.set(`server-${p.id}`, p.id);
            });
            setServerProjectIds(idMap);
            setProjects(serverProjects);
          } else {
            // Fallback to localStorage if no server projects
            loadFromLocalStorage();
          }
        })
        .catch(err => {
          console.error('Failed to load projects from server:', err);
          loadFromLocalStorage();
        });
    } else {
      loadFromLocalStorage();
    }
  }, [isAuthenticated, token]);

  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem('selectrik_projects');
    if (stored) {
      const parsed = JSON.parse(stored);
      setProjects(parsed.map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
      })));
    }
  };

  // Save to localStorage when projects change
  useEffect(() => {
    localStorage.setItem('selectrik_projects', JSON.stringify(projects));
  }, [projects]);

  // Add to history when projects change
  const addToHistory = (newProjects: Project[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newProjects)));
    if (newHistory.length > 50) newHistory.shift(); // Keep only last 50 states
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const previousState = history[historyIndex - 1];
      setProjects(JSON.parse(JSON.stringify(previousState)));
      setHistoryIndex(historyIndex - 1);
      if (currentProject) {
        const updatedCurrent = previousState.find(p => p.id === currentProject.id);
        setCurrentProject(updatedCurrent || null);
      }
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setProjects(JSON.parse(JSON.stringify(nextState)));
      setHistoryIndex(historyIndex + 1);
      if (currentProject) {
        const updatedCurrent = nextState.find(p => p.id === currentProject.id);
        setCurrentProject(updatedCurrent || null);
      }
    }
  };

  const createProject = (name: string, type: Project['type'], description?: string): Project => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name,
      type,
      description,
      rooms: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft',
    };

    setProjects((prev) => {
      const updated = [...prev, newProject];
      addToHistory(updated);
      return updated;
    });
    return newProject;
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.id === projectId
          ? { ...p, ...updates, updatedAt: new Date() }
          : p
      );
      addToHistory(updated);
      return updated;
    });

    if (currentProject?.id === projectId) {
      setCurrentProject((prev) => prev ? { ...prev, ...updates, updatedAt: new Date() } : null);
    }
  };

  const deleteProject = (projectId: string) => {
    // Delete from server if authenticated
    if (isAuthenticated && token) {
      const serverProjectId = serverProjectIds.get(projectId);
      if (serverProjectId) {
        fetch(`${API_BASE_URL}/projects/${serverProjectId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }).catch(err => console.error('Failed to delete project from server:', err));
      }
    }

    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== projectId);
      addToHistory(updated);
      return updated;
    });
    if (currentProject?.id === projectId) {
      setCurrentProject(null);
    }
  };

  const addRoom = (projectId: string, room: Omit<Room, 'id' | 'items'>) => {
    const newRoom: Room = {
      ...room,
      id: `room-${Date.now()}`,
      items: [],
      groups: [],
    };

    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.id === projectId
          ? { ...p, rooms: [...p.rooms, newRoom], updatedAt: new Date() }
          : p
      );
      addToHistory(updated);
      return updated;
    });

    if (currentProject?.id === projectId) {
      setCurrentProject((prev) =>
        prev ? { ...prev, rooms: [...prev.rooms, newRoom], updatedAt: new Date() } : null
      );
    }
  };

  const addRoomFromTemplate = (projectId: string, templateType: 'bucatarie' | 'baie' | 'dormitor' | 'living') => {
    const templates = {
      bucatarie: {
        name: 'Bucătărie',
        icon: 'UtensilsCrossed',
        width: 4,
        height: 3.5,
        items: [
          { itemId: 'priza-dubla', quantity: 4, comment: 'Pentru electrocasnice' },
          { itemId: 'priza-schuko', quantity: 2, comment: 'Cuptor și mașină de spălat vase' },
          { itemId: 'spot-led', quantity: 8, comment: 'Iluminat general' },
          { itemId: 'banda-led', quantity: 1, comment: 'Sub dulapuri' },
          { itemId: 'intrerupator-dublu', quantity: 1, comment: 'Spot-uri și bandă LED' },
          { itemId: 'doza-aparat', quantity: 6 },
        ],
      },
      baie: {
        name: 'Baie',
        icon: 'Bath',
        width: 2.5,
        height: 2,
        items: [
          { itemId: 'priza-schuko', quantity: 2, comment: 'Mașină de spălat și uscător păr' },
          { itemId: 'spot-led', quantity: 4, comment: 'Iluminat general' },
          { itemId: 'aplica', quantity: 2, comment: 'Oglindă' },
          { itemId: 'intrerupator-simplu', quantity: 1 },
          { itemId: 'doza-aparat', quantity: 3 },
          { itemId: 'doza-derivatie', quantity: 1 },
        ],
      },
      dormitor: {
        name: 'Dormitor',
        icon: 'Bed',
        width: 4,
        height: 3.5,
        items: [
          { itemId: 'priza-dubla', quantity: 5, comment: '2 lângă pat, 3 pe pereți' },
          { itemId: 'plafoniera', quantity: 1, comment: 'Iluminat central' },
          { itemId: 'aplica', quantity: 2, comment: 'Lângă pat' },
          { itemId: 'intrerupator-simplu', quantity: 2, comment: 'Plafoniera și aplice' },
          { itemId: 'dimmer', quantity: 1, comment: 'Pentru aplice' },
          { itemId: 'doza-aparat', quantity: 7 },
        ],
      },
      living: {
        name: 'Living',
        icon: 'Sofa',
        width: 5,
        height: 4,
        items: [
          { itemId: 'priza-dubla', quantity: 8, comment: 'Distribute pe pereți' },
          { itemId: 'priza-usb', quantity: 2, comment: 'Lângă canapea' },
          { itemId: 'spot-led', quantity: 10, comment: 'Iluminat general' },
          { itemId: 'banda-led', quantity: 2, comment: 'Decor tavan și TV' },
          { itemId: 'intrerupator-dublu', quantity: 2, comment: 'Spot-uri și benzi' },
          { itemId: 'dimmer', quantity: 1, comment: 'Pentru spot-uri' },
          { itemId: 'doza-aparat', quantity: 10 },
          { itemId: 'doza-derivatie', quantity: 2 },
        ],
      },
    };

    const template = templates[templateType];
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      name: template.name,
      icon: template.icon,
      width: template.width,
      height: template.height,
      items: template.items.map((item, index) => ({
        id: `item-${Date.now()}-${index}`,
        ...item,
      })),
      groups: [],
    };

    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.id === projectId
          ? { ...p, rooms: [...p.rooms, newRoom], updatedAt: new Date() }
          : p
      );
      addToHistory(updated);
      return updated;
    });

    if (currentProject?.id === projectId) {
      setCurrentProject((prev) =>
        prev ? { ...prev, rooms: [...prev.rooms, newRoom], updatedAt: new Date() } : null
      );
    }
  };

  const updateRoom = (projectId: string, roomId: string, updates: Partial<Room>) => {
    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              rooms: p.rooms.map((r) => (r.id === roomId ? { ...r, ...updates } : r)),
              updatedAt: new Date(),
            }
          : p
      );
      addToHistory(updated);
      return updated;
    });

    if (currentProject?.id === projectId) {
      setCurrentProject((prev) =>
        prev
          ? {
              ...prev,
              rooms: prev.rooms.map((r) => (r.id === roomId ? { ...r, ...updates } : r)),
              updatedAt: new Date(),
            }
          : null
      );
    }
  };

  const deleteRoom = (projectId: string, roomId: string) => {
    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              rooms: p.rooms.filter((r) => r.id !== roomId),
              updatedAt: new Date(),
            }
          : p
      );
      addToHistory(updated);
      return updated;
    });

    if (currentProject?.id === projectId) {
      setCurrentProject((prev) =>
        prev
          ? {
              ...prev,
              rooms: prev.rooms.filter((r) => r.id !== roomId),
              updatedAt: new Date(),
            }
          : null
      );
    }
  };

  const addItemToRoom = (projectId: string, roomId: string, item: Omit<RoomItem, 'id'>) => {
    const newItem: RoomItem = {
      ...item,
      id: `item-${Date.now()}`,
    };

    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              rooms: p.rooms.map((r) =>
                r.id === roomId ? { ...r, items: [...r.items, newItem] } : r
              ),
              updatedAt: new Date(),
            }
          : p
      );
      addToHistory(updated);
      return updated;
    });

    if (currentProject?.id === projectId) {
      setCurrentProject((prev) =>
        prev
          ? {
              ...prev,
              rooms: prev.rooms.map((r) =>
                r.id === roomId ? { ...r, items: [...r.items, newItem] } : r
              ),
              updatedAt: new Date(),
            }
          : null
      );
    }
  };

  const updateRoomItem = (projectId: string, roomId: string, itemId: string, updates: Partial<RoomItem>) => {
    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              rooms: p.rooms.map((r) =>
                r.id === roomId
                  ? {
                      ...r,
                      items: r.items.map((i) => (i.id === itemId ? { ...i, ...updates } : i)),
                    }
                  : r
              ),
              updatedAt: new Date(),
            }
          : p
      );
      addToHistory(updated);
      return updated;
    });

    if (currentProject?.id === projectId) {
      setCurrentProject((prev) =>
        prev
          ? {
              ...prev,
              rooms: prev.rooms.map((r) =>
                r.id === roomId
                  ? {
                      ...r,
                      items: r.items.map((i) => (i.id === itemId ? { ...i, ...updates } : i)),
                    }
                  : r
              ),
              updatedAt: new Date(),
            }
          : null
      );
    }
  };

  const deleteRoomItem = (projectId: string, roomId: string, itemId: string) => {
    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              rooms: p.rooms.map((r) =>
                r.id === roomId
                  ? { ...r, items: r.items.filter((i) => i.id !== itemId) }
                  : r
              ),
              updatedAt: new Date(),
            }
          : p
      );
      addToHistory(updated);
      return updated;
    });

    if (currentProject?.id === projectId) {
      setCurrentProject((prev) =>
        prev
          ? {
              ...prev,
              rooms: prev.rooms.map((r) =>
                r.id === roomId
                  ? { ...r, items: r.items.filter((i) => i.id !== itemId) }
                  : r
              ),
              updatedAt: new Date(),
            }
          : null
      );
    }
  };

  const createGroup = (projectId: string, roomId: string, name: string, itemIds: string[]) => {
    const newGroup: ItemGroup = {
      id: `group-${Date.now()}`,
      name,
      items: itemIds,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    };

    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              rooms: p.rooms.map((r) =>
                r.id === roomId
                  ? {
                      ...r,
                      groups: [...(r.groups || []), newGroup],
                      items: r.items.map((item) =>
                        itemIds.includes(item.id)
                          ? { ...item, groupId: newGroup.id }
                          : item
                      ),
                    }
                  : r
              ),
              updatedAt: new Date(),
            }
          : p
      );
      addToHistory(updated);
      return updated;
    });

    if (currentProject?.id === projectId) {
      setCurrentProject((prev) =>
        prev
          ? {
              ...prev,
              rooms: prev.rooms.map((r) =>
                r.id === roomId
                  ? {
                      ...r,
                      groups: [...(r.groups || []), newGroup],
                      items: r.items.map((item) =>
                        itemIds.includes(item.id)
                          ? { ...item, groupId: newGroup.id }
                          : item
                      ),
                    }
                  : r
              ),
              updatedAt: new Date(),
            }
          : null
      );
    }
  };

  const updateGroup = (projectId: string, roomId: string, groupId: string, updates: Partial<ItemGroup>) => {
    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              rooms: p.rooms.map((r) =>
                r.id === roomId
                  ? {
                      ...r,
                      groups: (r.groups || []).map((g) =>
                        g.id === groupId ? { ...g, ...updates } : g
                      ),
                    }
                  : r
              ),
              updatedAt: new Date(),
            }
          : p
      );
      addToHistory(updated);
      return updated;
    });

    if (currentProject?.id === projectId) {
      setCurrentProject((prev) =>
        prev
          ? {
              ...prev,
              rooms: prev.rooms.map((r) =>
                r.id === roomId
                  ? {
                      ...r,
                      groups: (r.groups || []).map((g) =>
                        g.id === groupId ? { ...g, ...updates } : g
                      ),
                    }
                  : r
              ),
              updatedAt: new Date(),
            }
          : null
      );
    }
  };

  const deleteGroup = (projectId: string, roomId: string, groupId: string) => {
    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              rooms: p.rooms.map((r) =>
                r.id === roomId
                  ? {
                      ...r,
                      groups: (r.groups || []).filter((g) => g.id !== groupId),
                      items: r.items.map((item) =>
                        item.groupId === groupId
                          ? { ...item, groupId: undefined }
                          : item
                      ),
                    }
                  : r
              ),
              updatedAt: new Date(),
            }
          : p
      );
      addToHistory(updated);
      return updated;
    });

    if (currentProject?.id === projectId) {
      setCurrentProject((prev) =>
        prev
          ? {
              ...prev,
              rooms: prev.rooms.map((r) =>
                r.id === roomId
                  ? {
                      ...r,
                      groups: (r.groups || []).filter((g) => g.id !== groupId),
                      items: r.items.map((item) =>
                        item.groupId === groupId
                          ? { ...item, groupId: undefined }
                          : item
                      ),
                    }
                  : r
              ),
              updatedAt: new Date(),
            }
          : null
      );
    }
  };

  const getTotalPrice = (projectId: string): number => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return 0;

    let total = 0;
    project.rooms.forEach((room) => {
      room.items.forEach((item) => {
        const catalogItem = ELECTRICAL_CATALOG.find(
          (ci) => ci.id === item.itemId
        );
        if (catalogItem) {
          total += catalogItem.price * item.quantity;
        }
      });
    });

    return total;
  };

  const saveProjectNow = async (): Promise<void> => {
    if (!isAuthenticated || !token || projects.length === 0) {
      console.log('⚠️ Nu pot salva - user neautentificat sau fără proiecte');
      return;
    }

    console.log('💾 Salvare forțată pentru', projects.length, 'proiecte');

    const savePromises = projects.map(async (project) => {
      const serverProjectId = serverProjectIds.get(project.id);

      const projectData = {
        projectId: serverProjectId || null,
        name: project.name,
        type: project.type,
        data: {
          description: project.description,
          rooms: project.rooms,
          metadata: project.metadata, // Include metadata for fotovoltaic/bransament
          status: project.status,
        },
      };

      console.log(`📤 Salvare imediată: ${project.name}`, { 
        rooms: project.rooms.length,
        hasMetadata: !!project.metadata,
        metadata: project.metadata 
      });

      try {
        const response = await fetch(`${API_BASE_URL}/projects/autosave`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(projectData),
        });

        const data = await response.json();
        console.log('✅ Salvare reușită:', data);

        if (data.project && !serverProjectId) {
          // Update mapping for newly created project
          setServerProjectIds(prev => new Map(prev).set(project.id, data.project.id));
        }
      } catch (err) {
        console.error('❌ Salvare eșuată:', err);
        throw err;
      }
    });

    await Promise.all(savePromises);
    localStorage.setItem('selectrik_projects', JSON.stringify(projects));
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        setCurrentProject,
        createProject,
        updateProject,
        deleteProject,
        saveProjectNow,
        addRoom,
        addRoomFromTemplate,
        updateRoom,
        deleteRoom,
        addItemToRoom,
        updateRoomItem,
        deleteRoomItem,
        createGroup,
        updateGroup,
        deleteGroup,
        getTotalPrice,
        undo,
        redo,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
