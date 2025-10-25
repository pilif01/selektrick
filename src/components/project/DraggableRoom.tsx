import { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
import { Trash2, Plus, GripVertical, MessageSquare, Check, X } from 'lucide-react';
import { useProjects } from '../../contexts/ProjectContext';
import { Room, ELECTRICAL_CATALOG } from '../../types/project';
import { RoomDetailModal } from './RoomDetailModal';
import { IconRenderer } from './IconRenderer';

interface DraggableRoomProps {
  room: Room;
}

const ItemTypes = {
  ROOM: 'room',
  ELECTRICAL_ITEM: 'electrical_item',
};

export const DraggableRoom: React.FC<DraggableRoomProps> = ({ room }) => {
  const { currentProject, deleteRoom, updateRoomItem } = useProjects();
  const [showDetails, setShowDetails] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  // Drag functionality
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ROOM,
    item: { id: room.id, type: ItemTypes.ROOM },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Drop functionality for electrical items
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.ELECTRICAL_ITEM,
    drop: (_item: any) => {
      // Item will be added through the palette component
      return { roomId: room.id };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // Attach drag and drop to entire card
  drag(drop(ref));

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Sigur vrei să ștergi camera "${room.name}"?`)) {
      if (currentProject) {
        deleteRoom(currentProject.id, room.id);
      }
    }
  };

  const getRoomPrice = () => {
    return room.items.reduce((total, item) => {
      const catalogItem = ELECTRICAL_CATALOG.find((ci) => ci.id === item.itemId);
      return total + (catalogItem?.price || 0) * item.quantity;
    }, 0);
  };

  const handleStartEditComment = (itemId: string, currentComment?: string) => {
    setEditingCommentId(itemId);
    setCommentText(currentComment || '');
  };

  const handleSaveComment = (itemId: string) => {
    if (currentProject) {
      updateRoomItem(currentProject.id, room.id, itemId, { comment: commentText });
      setEditingCommentId(null);
      setCommentText('');
    }
  };

  const handleCancelComment = () => {
    setEditingCommentId(null);
    setCommentText('');
  };

  const roomPrice = getRoomPrice();

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setShowDetails(true)}
        className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-2 rounded-xl p-6 cursor-move transition-all min-h-[250px] relative select-none ${
          isDragging
            ? 'opacity-50 scale-95'
            : isOver && canDrop
            ? 'border-green-500 shadow-lg shadow-green-500/20'
            : 'border-gray-700 hover:border-selectrik-gold'
        }`}
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        {/* Drop indicator */}
        {isOver && canDrop && (
          <div className="absolute inset-0 bg-green-500/10 rounded-xl flex items-center justify-center">
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold">
              Trage aici pentru a adăuga
            </div>
          </div>
        )}

        {/* Room Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <GripVertical size={20} className="text-gray-500" />
            <IconRenderer iconName={room.icon} size={40} className="text-selectrik-gold" />
            <div>
              <h3 className="text-xl font-bold text-white">{room.name}</h3>
              {room.width && room.height && (
                <p className="text-xs text-gray-400">
                  {room.width}m × {room.height}m
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-1">
            <button
              onClick={handleDelete}
              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
              title="Șterge"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Items Preview */}
        <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
          {room.items.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-sm">
              <Plus className="w-6 h-6 mx-auto mb-1 opacity-50" />
              <p>Trage obiecte aici</p>
            </div>
          ) : (
            <div className="space-y-2">
              {room.items.map((item) => {
                const catalogItem = ELECTRICAL_CATALOG.find((ci) => ci.id === item.itemId);
                if (!catalogItem) return null;

                const isEditingComment = editingCommentId === item.id;

                return (
                  <div
                    key={item.id}
                    className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-3 hover:bg-gray-700/50 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-start gap-3">
                      <IconRenderer iconName={catalogItem.icon} size={24} className="flex-shrink-0 text-selectrik-gold" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-white truncate">
                            {catalogItem.name}
                          </h4>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-selectrik-gold whitespace-nowrap">
                              ×{item.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartEditComment(item.id, item.comment);
                              }}
                              className={`p-1 rounded transition-colors ${
                                item.comment
                                  ? 'text-selectrik-gold hover:bg-selectrik-gold/10'
                                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-600/50'
                              }`}
                              title={item.comment ? 'Editează comentariu' : 'Adaugă comentariu'}
                            >
                              <MessageSquare size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-2 mb-1">
                          {catalogItem.description}
                        </p>

                        {/* Comment Section */}
                        {isEditingComment ? (
                          <div className="mt-2 space-y-2">
                            <textarea
                              autoFocus
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Adaugă un comentariu..."
                              className="w-full px-2 py-1 text-xs bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:border-selectrik-gold resize-none"
                              rows={2}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="flex gap-1 justify-end">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCancelComment();
                                }}
                                className="p-1 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors"
                                title="Anulează"
                              >
                                <X size={14} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSaveComment(item.id);
                                }}
                                className="p-1 text-green-400 hover:text-white hover:bg-green-500/20 rounded transition-colors"
                                title="Salvează"
                              >
                                <Check size={14} />
                              </button>
                            </div>
                          </div>
                        ) : item.comment ? (
                          <div className="mt-1 px-2 py-1 bg-gray-800/50 border border-gray-600/30 rounded text-xs text-gray-300 italic flex items-start gap-1">
                            <MessageSquare size={12} className="flex-shrink-0 mt-0.5 text-selectrik-gold" />
                            <span>{item.comment}</span>
                          </div>
                        ) : null}

                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">{catalogItem.category}</span>
                          <span className="text-xs font-semibold text-green-400">
                            {catalogItem.price * item.quantity} RON
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Price Footer */}
        <div className="pt-4 border-t border-gray-700 flex items-center justify-between">
          <span className="text-gray-400 text-sm">Total:</span>
          <span className="text-lg font-bold text-selectrik-gold">{roomPrice} RON</span>
        </div>

        {/* Drag indicator */}
        {isDragging && (
          <div className="absolute inset-0 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
              Trage pentru a reordona
            </div>
          </div>
        )}
      </motion.div>

      {/* Detail Modal */}
      {showDetails && <RoomDetailModal room={room} onClose={() => setShowDetails(false)} />}
    </>
  );
};

export { ItemTypes };
