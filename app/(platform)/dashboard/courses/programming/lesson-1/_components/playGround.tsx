import React, { useState } from 'react';
import { AlertCircle, Plus, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const VariablePlayground = () => {
  const [variables, setVariables] = useState([]);
  const [newVarName, setNewVarName] = useState('');
  const [newVarType, setNewVarType] = useState('string');
  const [newVarValue, setNewVarValue] = useState('');
  const [error, setError] = useState('');

  const addVariable = () => {
    if (!newVarName || !newVarType || !newVarValue) {
      setError('Please fill in all fields');
      return;
    }

    let parsedValue;
    try {
      switch (newVarType) {
        case 'number':
          parsedValue = parseFloat(newVarValue);
          if (isNaN(parsedValue)) throw new Error('Invalid number');
          break;
        case 'boolean':
          parsedValue = newVarValue.toLowerCase() === 'true';
          break;
        case 'array':
          parsedValue = JSON.parse(newVarValue);
          if (!Array.isArray(parsedValue)) throw new Error('Invalid array');
          break;
        case 'object':
          parsedValue = JSON.parse(newVarValue);
          if (typeof parsedValue !== 'object' || parsedValue === null) throw new Error('Invalid object');
          break;
        default:
          parsedValue = newVarValue;
      }
    } catch (err) {
      setError(`Invalid value for type ${newVarType}`);
      return;
    }

    setVariables([...variables, { name: newVarName, type: newVarType, value: parsedValue }]);
    setNewVarName('');
    setNewVarValue('');
    setError('');
  };

  const removeVariable = (index) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const renderValue = (variable) => {
    switch (variable.type) {
      case 'array':
      case 'object':
        return JSON.stringify(variable.value);
      default:
        return String(variable.value);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Interactive Variable Playground</h1>
      
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Variable Name"
          value={newVarName}
          onChange={(e) => setNewVarName(e.target.value)}
        />
        <Select value={newVarType} onValueChange={setNewVarType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="string">String</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="boolean">Boolean</SelectItem>
            <SelectItem value="array">Array</SelectItem>
            <SelectItem value="object">Object</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Value"
          value={newVarValue}
          onChange={(e) => setNewVarValue(e.target.value)}
        />
        <Button onClick={addVariable}>
          <Plus className="mr-2 h-4 w-4" /> Add Variable
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {variables.map((variable, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
            <div>
              <span className="font-bold">{variable.name}</span>
              <span className="mx-2 text-gray-500">({variable.type})</span>
              <span className="font-mono">{renderValue(variable)}</span>
            </div>
            <Button variant="destructive" size="icon" onClick={() => removeVariable(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariablePlayground;