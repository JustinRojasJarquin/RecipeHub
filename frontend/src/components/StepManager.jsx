function StepManager({ steps, onChange }) {
  const updateStep = (index, value) => {
    const next = [...steps]
    next[index] = value
    onChange(next)
  }

  const addStep = () => {
    onChange([...steps, ''])
  }

  const removeStep = (index) => {
    onChange(steps.filter((_, itemIndex) => itemIndex !== index))
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Pasos</h3>
        <button type="button" className="button secondary" onClick={addStep}>+ Añadir paso</button>
      </div>
      {steps.map((step, index) => (
        <div key={index} className="inline-field">
          <textarea
            rows="2"
            value={step}
            onChange={(event) => updateStep(index, event.target.value)}
            placeholder={`Paso ${index + 1}`}
          />
          <button type="button" className="ghost-button" onClick={() => removeStep(index)}>Eliminar</button>
        </div>
      ))}
    </section>
  )
}

export default StepManager
